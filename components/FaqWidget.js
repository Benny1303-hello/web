'use client';

import { useState } from 'react';
import { MessageCircleQuestion, X, Bot } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function FaqWidget() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState([]);

  const itemsRaw = t('faqWidget.items');
  const items = Array.isArray(itemsRaw) ? itemsRaw : [];

  const handleAsk = (item) => {
    setLog((prev) => [...prev, { type: 'user', text: item.q }, { type: 'bot', text: item.a }]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(560px,calc(100vh-140px))] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/10"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 bg-navy-950 px-5 py-4 text-white">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-400">
                  <Bot size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight">{t('faqWidget.title')}</p>
                  <p className="text-xs leading-tight text-slate-300">{t('faqWidget.subtitle')}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('faqWidget.closeLabel')}
                className="shrink-0 rounded-full p-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-mist-50 px-4 py-4">
              <div className="flex items-start gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
                  <Bot size={14} />
                </span>
                <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink-700 shadow-soft">
                  {t('faqWidget.greeting')}
                </p>
              </div>

              {log.map((entry, i) =>
                entry.type === 'user' ? (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-brand-500 to-cyan-400 px-3.5 py-2.5 text-sm font-medium leading-relaxed text-navy-950">
                      {entry.text}
                    </p>
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
                      <Bot size={14} />
                    </span>
                    <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink-700 shadow-soft">
                      {entry.text}
                    </p>
                  </div>
                )
              )}
            </div>

            <div className="shrink-0 border-t border-black/5 bg-white px-4 py-3.5">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ink-400">{t('faqWidget.chipsLabel')}</p>
              <div className="flex max-h-28 flex-wrap gap-2 overflow-y-auto">
                {items.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleAsk(item)}
                    className="rounded-full border border-black/10 px-3 py-1.5 text-left text-xs font-medium text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-ink-400">
                {t('faqWidget.footerNote')}{' '}
                <a href={site.phoneHref} className="font-semibold text-brand-600 hover:underline">
                  {t('faqWidget.contactCta')}
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('faqWidget.toggleLabel')}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 text-navy-950 shadow-glow transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {open ? <X size={24} /> : <MessageCircleQuestion size={24} />}
      </button>
    </div>
  );
}
