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
          <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">{t('partnersSection.eyebrow')}</p>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-16 w-36 items-center justify-center rounded-2xl bg-white px-5 py-3 shadow-soft ring-1 ring-black/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG logos, no benefit from next/image optimization */}
              <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
