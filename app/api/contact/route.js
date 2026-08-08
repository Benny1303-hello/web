import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Dữ liệu gửi lên không hợp lệ.' }, { status: 400 });
  }

  const { name, email, phone, subject, message } = body ?? {};

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !subject?.trim() || !message?.trim()) {
    return Response.json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email.trim())) {
    return Response.json({ error: 'Địa chỉ email không hợp lệ.' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[api/contact] Missing RESEND_API_KEY env var');
    return Response.json({ error: 'Hệ thống gửi email chưa sẵn sàng, vui lòng thử lại sau.' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: 'TTC-Infotech Website <onboarding@resend.dev>',
      to: 'sales@ttc-infotech.com.vn',
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

    if (error) {
      console.error('[api/contact] Resend error:', error);
      return Response.json({ error: 'Gửi email thất bại, vui lòng thử lại sau.' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[api/contact] Unexpected error:', err);
    return Response.json({ error: 'Có lỗi xảy ra, vui lòng thử lại sau.' }, { status: 500 });
  }
}
