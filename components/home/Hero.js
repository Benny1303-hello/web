'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import HeroSlideshow from '@/components/HeroSlideshow';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden text-white">
      <HeroSlideshow overlayClassName="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/55" />

      <div className="container-page relative flex flex-col items-center gap-14 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            {t('hero.tagline')}
          </span>
          <h1 className="mt-6 text-balance font-display text-5xl font-extrabold md:text-6xl">
            <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              TTC-INFOTECH
            </span>
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-400">
            {t('hero.subtitle')}
          </p>
          <p className="mx-auto mt-6 max-w-lg text-balance text-slate-300">
            {t('hero.description')}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
