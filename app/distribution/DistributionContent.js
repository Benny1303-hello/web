'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { distributionBrands, distributionValues, certifications } from '@/lib/content';
import { ICONS } from '@/lib/icons';
import { useLanguage } from '@/context/LanguageContext';

export default function DistributionContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        crumb={t('pages.distribution.hero.crumb')}
        eyebrow={t('pages.distribution.hero.eyebrow')}
        title={t('pages.distribution.hero.title')}
        description={t('pages.distribution.hero.description')}
      />

      <section className="bg-white py-12">
        <div className="container-page">
          <Reveal>
            <Link
              href="/products"
              className="group flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-400 px-7 py-5 text-navy-950 shadow-glow transition-transform duration-200 hover:scale-[1.01]"
            >
              <span className="font-display text-lg font-bold">{t('pages.distribution.viewProducts')}</span>
              <ArrowRight size={20} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">
              {t('pages.distribution.intro.eyebrow')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              {t('pages.distribution.intro.heading')}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-400">{t('pages.distribution.intro.desc')}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">
              {t('pages.distribution.brandsSection.eyebrow')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              {t('pages.distribution.brandsSection.heading')}
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {distributionBrands.map((brand, i) => {
              const Icon = ICONS[brand.icon];
              return (
                <Reveal key={brand.key} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-white p-7 shadow-soft ring-1 ring-black/5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display text-base font-bold text-ink-900">
                        {t(`pages.distribution.brands.${brand.key}.name`)}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400">
                      {t(`pages.distribution.brands.${brand.key}.desc`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">
              {t('pages.distribution.valuesSection.eyebrow')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              {t('pages.distribution.valuesSection.heading')}
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {distributionValues.map((value, i) => {
              const Icon = ICONS[value.icon];
              return (
                <Reveal key={value.key} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-black/5 bg-mist-50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-cyan-300">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display text-base font-bold text-ink-900">
                        {t(`pages.distribution.values.${value.key}.title`)}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400">
                      {t(`pages.distribution.values.${value.key}.desc`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600 flex items-center justify-center gap-2">
              <BadgeCheck size={16} /> {t('certificationsSection.eyebrow')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              {t('certificationsSection.heading')}
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <Reveal key={cert.key} delay={i * 0.1}>
                <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
                  <Image
                    src={cert.image}
                    alt={t(`certifications.${cert.key}`)}
                    width={1129}
                    height={800}
                    className="h-auto w-full"
                  />
                </div>
                <p className="mt-4 text-center text-sm font-semibold text-ink-900">{t(`certifications.${cert.key}`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
