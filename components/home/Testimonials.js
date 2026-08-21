'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { testimonials } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 9000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (dir) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section className="bg-navy-950 py-20 text-white">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{t('testimonials.eyebrow')}</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold !leading-relaxed md:text-4xl">
            {t('testimonials.heading')}
          </h2>
        </Reveal>

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                {current.avatar && (
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    width={192}
                    height={192}
                    className="mx-auto h-48 w-48 rounded-full object-cover ring-4 ring-white/15"
                  />
                )}
                <p className="mt-4 font-display text-lg font-bold text-white">{current.name}</p>
                <p className="text-sm text-cyan-300">{current.role}</p>

                <Quote className="mx-auto mt-6 mb-4 text-brand-400" size={30} />
                <p className="mx-auto max-w-2xl text-balance leading-relaxed text-slate-200">
                  “{t(`testimonials.items.${current.key}.quote`)}”
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label={t('testimonials.prev')}
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.key}
                  aria-label={t('testimonials.pageLabel', { n: i + 1 })}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-cyan-400' : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label={t('testimonials.next')}
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
