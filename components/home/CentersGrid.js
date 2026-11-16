'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { centers } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

// Photo per center, looked up by the center's own key so adding a center in
// lib/content.js without a photo degrades to a plain tile instead of
// mismatching by position.
const CENTER_IMAGES = {
  distribution: '/hero/slide-distribution.jpg',
  systemIntegration: '/hero/slide-system-integration.jpg',
  services: '/hero/slide-services.jpg',
};

export default function CentersGrid() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="font-display text-4xl font-extrabold uppercase tracking-[0.05em] text-brand-600 md:text-5xl">
            {t('centersSection.eyebrow')}
          </p>
          <h2 className="mt-4 text-balance font-display text-lg font-semibold text-navy-900 md:text-xl lg:text-2xl">
            {t('centersSection.heading')}
          </h2>
        </Reveal>

        {/* Flex-wrap with per-item widths (not a grid) so a leftover row stays
            centred if the number of centers ever changes. */}
        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {centers.map((center, i) => {
            const image = CENTER_IMAGES[center.key];
            return (
              <Reveal
                key={center.slug}
                delay={i * 0.1}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <Link
                  href={center.href ?? `/${center.slug}`}
                  className="group relative flex h-80 flex-col justify-end overflow-hidden rounded-2xl bg-navy-900 text-white shadow-soft transition-shadow duration-300 hover:shadow-card"
                >
                  {image && (
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/0" />
                  <div className="relative p-6">
                    <h3 className="font-display text-xl font-bold">{t(`centers.${center.key}.title`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">{t(`centers.${center.key}.short`)}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
                      {t('centersSection.viewMore')}
                      <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
