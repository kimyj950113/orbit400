import { db, key, send, clientIp } from './_lib.js';

// POST /api/find {name, phone} → 이름+연락처가 맞는 티켓 목록
export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'Method not allowed' }); }
  try {
    const r = db();
    const rk = `l1220:find:${clientIp(req)}`;
    const n = await r.incr(rk);
    if (n === 1) await r.expire(rk, 600);
    if (n > 10) return send(res, 429, { error: '조회를 너무 많이 했어요. 10분 뒤에 다시 해주세요.' });

    const b = typeof req.body === 'object' && req.body ? req.body : {};
    const name = String(b.name ?? '').replace(/\s/g, '');
    const phone = String(b.phone ?? '').replace(/\D/g, '');
    if (!name || !/^01\d{8,9}$/.test(phone)) return send(res, 400, { error: '이름과 연락처를 확인해 주세요.' });

    const tokens = await r.zrange(key.index, 0, -1);
    if (!tokens.length) return send(res, 404, { error: '맞는 티켓이 없어요. 예매할 때 쓴 이름과 연락처를 확인해 주세요.' });
    const rows = await r.mget(...tokens.map(key.order));
    const found = tokens
      .map((t, i) => ({ t, o: rows[i] }))
      .filter(({ o }) => o && o.phone === phone && String(o.name).replace(/\s/g, '') === name)
      .map(({ t, o }) => ({ token: t, name: o.name, qty: o.qty, status: o.status }));
    if (!found.length) return send(res, 404, { error: '맞는 티켓이 없어요. 예매할 때 쓴 이름과 연락처를 확인해 주세요.' });
    return send(res, 200, { tickets: found });
  } catch (e) {
    console.error(e);
    return send(res, 500, { error: '서버 문제로 조회하지 못했어요.' });
  }
}
