import { Resend } from 'resend';

export async function POST(request) {
  const { name, email, phone, subject, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: 'Thiếu thông tin bắt buộc.' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: 'TTC-Infotech Website <onboarding@resend.dev>',
    to: 'sales@ttc-infotech.com.vn',
    replyTo: email,
    subject: `[Liên hệ website] ${subject || 'Yêu cầu tư vấn mới'}`,
    text: [
      `Họ và tên: ${name}`,
      `Email: ${email}`,
      `Số điện thoại: ${phone || '—'}`,
      `Chủ đề: ${subject || '—'}`,
      '',
      'Nội dung:',
      message,
    ].join('\n'),
  });

  if (error) {
    return Response.json({ error: 'Gửi email thất bại.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
