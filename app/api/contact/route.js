import nodemailer from 'nodemailer';
import { site } from '@/lib/content';

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
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ errorCode: 'INVALID_BODY' }, { status: 400 });
  }

  const { name, email, phone, subject, message } = body ?? {};

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !subject?.trim() || !message?.trim()) {
    return Response.json({ errorCode: 'MISSING_FIELDS' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email.trim())) {
    return Response.json({ errorCode: 'INVALID_EMAIL' }, { status: 400 });
  }

  if (!transporter) {
    console.error('[api/contact] Missing SMTP_HOST/SMTP_USER/SMTP_PASS env vars');
    return Response.json({ errorCode: 'SERVER_NOT_READY' }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from: `TTC-Infotech Website <${process.env.SMTP_USER}>`,
      to: site.email,
      replyTo: email.trim(),
      subject: `Yêu cầu liên hệ mới - ${subject.trim()}`,
      text: [
        `Họ và tên: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Số điện thoại: ${phone.trim()}`,
        `Chủ đề: ${subject.trim()}`,
        '',
        'Nội dung:',
        message.trim(),
      ].join('\n'),
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[api/contact] SMTP send error:', err);
    return Response.json({ errorCode: 'SEND_FAILED' }, { status: 502 });
  }
}
