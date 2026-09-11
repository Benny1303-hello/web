// Simple in-memory rate limiter for the contact form. Not distributed (each
// serverless instance has its own memory), but it stops the common case — a
// single script hammering the endpoint from one IP — without adding a
// database or external service for a low-traffic marketing site's contact
// form. If traffic ever justifies it, swap this for Vercel KV/Upstash.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

const hits = new Map();

export function isRateLimited(key) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_REQUESTS;
}

export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}
