'use client';

import Reveal from '@/components/Reveal';
import { partners } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function PartnersMarquee() {
  const { t } = useLanguage();

  return (
    <section className="bg-mist-50 py-16">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{t('partnersSection.eyebrow')}</p>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {partners.map((partner) => (
            <span
              key={partner}
              className="flex items-center whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-600 shadow-soft ring-1 ring-black/5"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
