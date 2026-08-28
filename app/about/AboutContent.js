'use client';

import { Award } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { ICONS } from '@/lib/icons';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutContent() {
  const { t } = useLanguage();
  const pillarsRaw = t('pages.about.pillars');
  const whyChooseUsRaw = t('whyChooseUs.items');
  const pillars = Array.isArray(pillarsRaw) ? pillarsRaw : [];
  const whyChooseUs = Array.isArray(whyChooseUsRaw) ? whyChooseUsRaw : [];

  return (
    <>
      <PageHero
        crumb={t('pages.about.hero.crumb')}
        eyebrow={t('pages.about.hero.eyebrow')}
        title={t('pages.about.hero.title')}
        description={t('pages.about.hero.description')}
      />

      <section className="bg-white py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{t('pages.about.story1.eyebrow')}</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              {t('pages.about.story1.heading')}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-400">{t('pages.about.story1.desc')}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{t('pages.about.story2.eyebrow')}</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              {t('pages.about.story2.heading')}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-400">{t('pages.about.story2.desc')}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="container-page grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = ICONS[pillar.icon];
            return (
              <Reveal key={pillar.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-soft ring-1 ring-black/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink-900">{pillar.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400">{pillar.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 flex items-center justify-center gap-2">
              <Award size={16} /> {t('whyChooseUs.eyebrow')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              {t('whyChooseUs.heading')}
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {whyChooseUs.map((item, i) => {
              const Icon = ICONS[item.icon];
              return (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="h-full rounded-2xl border border-black/5 bg-mist-50 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-cyan-300">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink-900">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
