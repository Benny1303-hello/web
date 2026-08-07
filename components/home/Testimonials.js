'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { testimonials } from '@/lib/content';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Khách hàng nói gì</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold md:text-4xl">
            Được tin tưởng bởi các đối tác doanh nghiệp
          </h2>
        </Reveal>

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="mx-auto mb-6 text-brand-400" size={36} />

          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="text-balance text-lg leading-relaxed text-slate-200">“{current.quote}”</p>
                <p className="mt-6 font-display font-bold text-white">{current.name}</p>
                <p className="text-sm text-cyan-300">{current.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Trước"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  aria-label={`Đánh giá ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-cyan-400' : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Tiếp theo"
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
