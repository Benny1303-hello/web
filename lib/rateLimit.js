// Simple in-memory rate limiter for the contact form. Not distributed (each
// serverless instance has its own memory), so a caller that lands on a fresh
// instance gets a fresh allowance — enough to stop a single script hammering
// the endpoint without adding a database for a low-traffic marketing site's
// contact form. If traffic ever justifies it, swap this for Vercel KV/Upstash.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;
// Above this many tracked keys, sweep expired ones before adding more, so a
// flood of distinct keys can't grow the map without bound in a warm instance.
const SWEEP_THRESHOLD = 1000;

const hits = new Map();

function sweepExpired(now) {
  for (const [key, timestamps] of hits) {
    if (timestamps.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
}

export function isRateLimited(key) {
  const now = Date.now();
  if (hits.size > SWEEP_THRESHOLD) sweepExpired(now);
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_REQUESTS;
}

// Vercel's edge sets `x-real-ip` itself, so prefer it. Falling back to the
// first `x-forwarded-for` entry is correct here too: verified against the live
// deployment that Vercel replaces a client-supplied forwarded-for with the
// real client IP, so it can't be spoofed to dodge the limit from behind it.
export function getClientIp(request) {
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}
