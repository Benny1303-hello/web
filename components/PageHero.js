'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function PageHero({ eyebrow, title, description, crumb }) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-hero-mesh py-20 text-white">
      <div className="container-page relative text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest text-cyan-300">
            <Link href="/" className="transition-colors hover:text-white">
              {t('common.home')}
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-300">{crumb}</span>
          </div>
          {eyebrow && (
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
          )}
          <h1 className="mx-auto mt-3 max-w-2xl text-balance font-display text-4xl font-bold leading-tight md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-xl text-balance text-slate-300">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
