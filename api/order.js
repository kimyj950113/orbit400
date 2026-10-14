import { db, key, newToken, validToken, send, clientIp, publicView, PRICE, MAX_QTY } from './_lib.js';

const clean = (s, n) => String(s ?? '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, n);

export default async function handler(req, res) {
  try {
    const r = db();

    if (req.method === 'GET') {
      const t = String(req.query.t || '');
      if (!validToken(t)) return send(res, 400, { error: '티켓 링크가 올바르지 않아요.' });
      const o = await r.get(key.order(t));
      if (!o) return send(res, 404, { error: '티켓을 찾을 수 없어요.' });
      return send(res, 200, publicView(o, t));
    }

    if (req.method === 'POST') {
      const ip = clientIp(req);
      const n = await r.incr(key.rate(ip));
      if (n === 1) await r.expire(key.rate(ip), 600);
      if (n > 8) return send(res, 429, { error: '신청이 너무 많아요. 10분 뒤에 다시 해주세요.' });

      const b = typeof req.body === 'object' && req.body ? req.body : {};
      const name = clean(b.name, 20);
      const depositor = clean(b.depositor || b.name, 20);
      const phone = String(b.phone ?? '').replace(/\D/g, '');
      const qty = Number.parseInt(b.qty, 10);
      if (!name) return send(res, 400, { error: '이름을 적어주세요.' });
      if (!/^01\d{8,9}$/.test(phone)) return send(res, 400, { error: '연락처를 확인해 주세요.' });
      if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return send(res, 400, { error: `인원은 1~${MAX_QTY}명까지 신청할 수 있어요.` });

      const token = newToken();
      const now = Date.now();
      const order = { name, phone, depositor, qty, amount: qty * PRICE, status: 'pending', createdAt: now };
      await r.set(key.order(token), order);
      await r.zadd(key.index, { score: now, member: token });
      return send(res, 201, { token, amount: order.amount });
    }

    res.setHeader('Allow', 'GET, POST');
    return send(res, 405, { error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: '서버 문제로 처리하지 못했어요. 잠시 뒤 다시 해주세요.' });
  }
}
