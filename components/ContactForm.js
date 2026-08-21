'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send, Loader2 } from 'lucide-react';
import { site } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

const fieldNames = ['name', 'email', 'phone', 'subject'];
const fieldTypes = { name: 'text', email: 'email', phone: 'text', subject: 'text' };

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState('idle');
  const [errorCode, setErrorCode] = useState(null);
  const [values, setValues] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorCode(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrorCode(data?.errorCode || 'UNEXPECTED');
        setStatus('idle');
        return;
      }
      setStatus('sent');
    } catch {
      setErrorCode('NETWORK_ERROR');
      setStatus('idle');
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
        <h3 className="mt-4 font-display text-xl font-bold text-navy-900">{t('contactForm.successTitle')}</h3>
        <p className="mt-2 max-w-sm text-sm text-ink-400">{t('contactForm.successDesc')}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-black/5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fieldNames.map((name) => (
          <div key={name} className={name === 'subject' ? 'sm:col-span-2' : ''}>
            <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-600">
              {t(`contactForm.fields.${name}.label`)}
            </label>
            <input
              id={name}
              name={name}
              type={fieldTypes[name]}
              required
              placeholder={t(`contactForm.fields.${name}.placeholder`)}
              value={values[name]}
              onChange={handleChange}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-600">
            {t('contactForm.fields.message.label')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder={t('contactForm.fields.message.placeholder')}
            value={values.message}
            onChange={handleChange}
            className="w-full resize-none rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
          />
        </div>
      </div>

      {errorCode && (
        <p className="mt-4 text-sm font-medium text-red-600">
          {t(`contactForm.errors.${errorCode}`)}
          {!['INVALID_BODY', 'MISSING_FIELDS', 'INVALID_EMAIL'].includes(errorCode) && (
            <>
              {' '}
              {t('contactForm.errorPrefix')}{' '}
              <a href={site.phoneHref} className="underline">
                {site.phone}
              </a>
              .
            </>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 px-7 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === 'sending' ? (
          <>
            {t('contactForm.sending')}
            <Loader2 size={16} className="animate-spin" />
          </>
        ) : (
          <>
            {t('contactForm.submit')}
            <Send size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
