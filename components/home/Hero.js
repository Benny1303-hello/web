'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { useLanguage } from '@/context/LanguageContext';

const slides = [
  { src: '/hero/slide-partner.jpg', alt: 'Your IT Partner' },
  { src: '/hero/slide-system-integration.jpg', alt: 'System Integration' },
  { src: '/hero/slide-distribution.jpg', alt: 'Distribution Center' },
  { src: '/hero/slide-services.jpg', alt: 'Services Center' },
];

const SLIDE_INTERVAL = 5000;

export default function Hero() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              i === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/55" />
      </div>

      <div className="container-page relative flex flex-col items-center gap-14 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-center lg:text-left"
        >
          <span className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            {t('hero.tagline')}
          </span>
          <h1 className="mt-6 text-balance font-display text-5xl font-extrabold leading-[1.08] md:text-6xl">
            <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              TTC-INFOTECH
            </span>
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-400">
            {t('hero.subtitle')}
          </p>
          <p className="mx-auto mt-6 max-w-lg text-balance text-slate-300 lg:mx-0">
            {t('hero.description')}
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button href="/contact" variant="primary">
              {t('hero.ctaPrimary')}
            </Button>
            <Button href="/about" variant="outline" withArrow={false}>
              {t('hero.ctaSecondary')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
