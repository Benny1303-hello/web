'use client';

import { Zap, Clock, ShieldCheck, PackageCheck } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import ClientLogos from '@/components/ClientLogos';
import { servicesCriteria } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

const criteriaIcons = { Zap, Clock, ShieldCheck, PackageCheck };

export default function ServicesContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        crumb={t('pages.services.hero.crumb')}
        eyebrow={t('pages.services.hero.eyebrow')}
        title={t('pages.services.hero.title')}
        description={t('pages.services.hero.description')}
      />

      <section className="bg-white py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {t('pages.services.intro.eyebrow')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              {t('pages.services.intro.heading')}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-400">{t('pages.services.intro.desc')}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {t('pages.services.criteriaSection.eyebrow')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              {t('pages.services.criteriaSection.heading')}
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicesCriteria.map((item, i) => {
              const Icon = criteriaIcons[item.icon];
              return (
                <Reveal key={item.key} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-white p-7 shadow-soft ring-1 ring-black/5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display text-base font-bold text-ink-900">
                        {t(`pages.services.criteria.${item.key}.title`)}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400">
                      {t(`pages.services.criteria.${item.key}.desc`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ClientLogos />

      <CtaBanner />
    </>
  );
}
