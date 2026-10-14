import { db, key, validToken, isAdmin, send, publicView, clientIp, PRICE } from './_lib.js';

// GET  /api/admin            → 전체 주문 목록
// POST /api/admin {token, action}  action: confirm | unconfirm | checkin | uncheck | cancel | restore | reprice | delete
export default async function handler(req, res) {
  try {
    const r = db();
    const failKey = `l1220:afail:${clientIp(req)}`;
    const fails = Number(await r.get(failKey)) || 0;
    if (fails >= 10) return send(res, 429, { error: '비밀번호를 너무 많이 틀렸어요. 15분 뒤에 다시 해주세요.' });
    if (!isAdmin(req)) {
      const n = await r.incr(failKey);
      if (n === 1) await r.expire(failKey, 900);
      return send(res, 401, { error: '비밀번호가 맞지 않아요.' });
    }

    if (req.method === 'GET') {
      const tokens = await r.zrange(key.index, 0, -1, { rev: true });
      if (!tokens.length) return send(res, 200, { orders: [] });
      const rows = await r.mget(...tokens.map(key.order));
      const orders = tokens.map((t, i) => rows[i] && { ...publicView(rows[i], t), phone: rows[i].phone }).filter(Boolean);
      return send(res, 200, { orders });
    }

    if (req.method === 'POST') {
      const { token, action } = typeof req.body === 'object' && req.body ? req.body : {};
      if (!validToken(token)) return send(res, 400, { error: '코드가 올바르지 않아요.' });
      const k = key.order(token);
      const o = await r.get(k);
      if (!o) return send(res, 404, { error: '없는 티켓이에요.', code: 'not_found' });
      const now = Date.now();

      switch (action) {
        case 'confirm':
          if (o.status === 'pending') Object.assign(o, { status: 'paid', paidAt: now });
          break;
        case 'unconfirm':
          if (o.status === 'paid') Object.assign(o, { status: 'pending', paidAt: null });
          break;
        case 'checkin':
          if (o.status === 'checked') return send(res, 409, { error: '이미 입장한 티켓이에요.', code: 'already', order: { ...publicView(o, token), phone: o.phone } });
          if (o.status !== 'paid') return send(res, 409, { error: o.status === 'pending' ? '아직 입금 확인이 안 된 티켓이에요.' : '취소된 티켓이에요.', code: o.status, order: { ...publicView(o, token), phone: o.phone } });
          Object.assign(o, { status: 'checked', checkedInAt: now });
          break;
        case 'uncheck':
          if (o.status === 'checked') Object.assign(o, { status: 'paid', checkedInAt: null });
          break;
        case 'cancel':
          Object.assign(o, { status: 'canceled', canceledAt: now });
          break;
        case 'restore':
          if (o.status === 'canceled') Object.assign(o, { status: o.paidAt ? 'paid' : 'pending', canceledAt: null });
          break;
        case 'reprice':
          Object.assign(o, { amount: o.qty * PRICE });
          break;
        case 'delete':
          await r.del(k);
          await r.zrem(key.index, token);
          return send(res, 200, { deleted: true });
        default:
          return send(res, 400, { error: '알 수 없는 작업이에요.' });
      }
      await r.set(k, o);
      return send(res, 200, { order: { ...publicView(o, token), phone: o.phone } });
    }

    res.setHeader('Allow', 'GET, POST');
    return send(res, 405, { error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: '서버 문제로 처리하지 못했어요.' });
  }
}
