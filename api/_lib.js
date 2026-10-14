import { Redis } from '@upstash/redis';
import { randomBytes, timingSafeEqual } from 'node:crypto';

export const PRICE = 7000;
export const MAX_QTY = 10;
const P = 'l1220:';

let redis;
export function db() {
  if (!redis) {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) throw new Error('DB_NOT_CONFIGURED');
    redis = new Redis({ url, token });
  }
  return redis;
}

export const key = {
  order: t => `${P}o:${t}`,
  index: `${P}orders`,
  rate: ip => `${P}rl:${ip}`,
};

const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
export function newToken(len = 20) {
  const b = randomBytes(len);
  let s = '';
  for (let i = 0; i < len; i++) s += ALPHA[b[i] % ALPHA.length];
  return s;
}

export const validToken = t => typeof t === 'string' && /^[A-Za-z0-9]{12,40}$/.test(t);

export function isAdmin(req) {
  const want = process.env.ADMIN_PASSWORD || '';
  const got = String(req.headers['x-admin-key'] || '');
  if (!want || got.length !== want.length) return false;
  return timingSafeEqual(Buffer.from(got), Buffer.from(want));
}

export function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json(body);
}

export function clientIp(req) {
  return String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
}

export function publicView(o, token) {
  return {
    token,
    name: o.name,
    qty: o.qty,
    amount: o.amount,
    depositor: o.depositor,
    status: o.status,
    createdAt: o.createdAt,
    paidAt: o.paidAt || null,
    checkedInAt: o.checkedInAt || null,
  };
}
