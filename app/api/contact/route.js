import nodemailer from 'nodemailer';
import { site } from '@/lib/content';
import { CONTACT_ERROR_CODES, CONTACT_FIELD_MAX_LENGTHS } from '@/lib/contactErrors';
import { isRateLimited, getClientIp } from '@/lib/rateLimit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const smtpReady = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
const smtpPort = Number(process.env.SMTP_PORT) || 465;
// Implicit TLS on 465 vs STARTTLS on 587 (or a proxied port) can't always be
// inferred from the port number alone — SMTP_SECURE lets ops override it
// without a redeploy; unset falls back to the port-465 heuristic.
const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : smtpPort === 465;
const transporter = smtpReady
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

export async function POST(request) {
  if (isRateLimited(getClientIp(request))) {
    return Response.json({ errorCode: CONTACT_ERROR_CODES.RATE_LIMITED }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ errorCode: CONTACT_ERROR_CODES.INVALID_BODY }, { status: 400 });
  }

  // A non-string field (e.g. `{"name": 5}`) would otherwise throw on `.trim()`
  // and surface as an unhandled 500 instead of a clean 400.
  const fields = {};
  for (const [key, maxLength] of Object.entries(CONTACT_FIELD_MAX_LENGTHS)) {
    const value = body?.[key];
    if (value !== undefined && value !== null && typeof value !== 'string') {
      return Response.json({ errorCode: CONTACT_ERROR_CODES.INVALID_BODY }, { status: 400 });
    }
    fields[key] = (value ?? '').trim();
    if (fields[key].length > maxLength) {
      return Response.json({ errorCode: CONTACT_ERROR_CODES.INVALID_BODY }, { status: 400 });
    }
  }
  const { name, email, phone, subject, message } = fields;

  if (!name || !email || !phone || !subject || !message) {
    return Response.json({ errorCode: CONTACT_ERROR_CODES.MISSING_FIELDS }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json({ errorCode: CONTACT_ERROR_CODES.INVALID_EMAIL }, { status: 400 });
  }

  if (!transporter) {
    console.error('[api/contact] Missing SMTP_HOST/SMTP_USER/SMTP_PASS env vars');
    return Response.json({ errorCode: CONTACT_ERROR_CODES.SERVER_NOT_READY }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from: `TTC-Infotech Website <${process.env.SMTP_USER}>`,
      to: site.email,
      replyTo: email,
      subject: `Yêu cầu liên hệ mới - ${subject}`,
      text: [
        `Họ và tên: ${name}`,
        `Email: ${email}`,
        `Số điện thoại: ${phone}`,
        `Chủ đề: ${subject}`,
        '',
        'Nội dung:',
        message,
      ].join('\n'),
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[api/contact] SMTP send error:', err);
    return Response.json({ errorCode: CONTACT_ERROR_CODES.SEND_FAILED }, { status: 502 });
  }
}
