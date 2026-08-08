'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send, Loader2 } from 'lucide-react';

const fields = [
  { name: 'name', label: 'Họ và tên', type: 'text', placeholder: 'Nguyễn Văn A' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'ban@congty.com' },
  { name: 'phone', label: 'Số điện thoại', type: 'text', placeholder: '09xx xxx xxx' },
  { name: 'subject', label: 'Chủ đề', type: 'text', placeholder: 'Yêu cầu tư vấn giải pháp...' },
];

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [values, setValues] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Send failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full flex-col items-center justify-center rounded-2xl bg-mist-50 p-10 text-center"
      >
        <CheckCircle2 size={44} className="text-brand-500" />
        <h3 className="mt-4 font-display text-xl font-bold text-navy-900">Đã gửi yêu cầu thành công!</h3>
        <p className="mt-2 max-w-sm text-sm text-ink-400">
          Cảm ơn bạn đã liên hệ. Đội ngũ TTC-Infotech sẽ phản hồi trong thời gian sớm nhất.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-black/5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.name === 'subject' ? 'sm:col-span-2' : ''}>
            <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-ink-600">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={handleChange}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-600">
            Nội dung
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Mô tả nhu cầu của bạn..."
            value={values.message}
            onChange={handleChange}
            className="w-full resize-none rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm font-medium text-red-600">
          Gửi yêu cầu thất bại, vui lòng thử lại hoặc gọi trực tiếp {(' ')}
          <a href="tel:+84908161313" className="underline">
            (+84) 908 161 313
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 px-7 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === 'sending' ? (
          <>
            Đang gửi...
            <Loader2 size={16} className="animate-spin" />
          </>
        ) : (
          <>
            Gửi yêu cầu
            <Send size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
