'use client';

import { AlertTriangle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import ChecklistPanel from '@/components/ChecklistPanel';
import { ICONS } from '@/lib/icons';
import { useLanguage } from '@/context/LanguageContext';

export default function PromotionsContent() {
  const { t } = useLanguage();
  const tiersRaw = t('pages.promotions.tiers');
  const conditionsRaw = t('pages.promotions.conditions');
  const tiers = Array.isArray(tiersRaw) ? tiersRaw : [];
  const conditions = Array.isArray(conditionsRaw) ? conditionsRaw : [];

  return (
    <>
      <PageHero
        crumb={t('pages.promotions.hero.crumb')}
        eyebrow={t('pages.promotions.hero.eyebrow')}
        title={t('pages.promotions.hero.title')}
        description={t('pages.promotions.hero.description')}
      />

      <section className="border-y border-amber-200 bg-amber-50 py-4">
        <div className="container-page flex items-start gap-3 text-sm text-amber-900">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-500" />
          <p>{t('pages.promotions.notice')}</p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              {t('pages.promotions.tiersHeading')}
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {tiers.map((tier, i) => {
              const Icon = ICONS[tier.icon];
              return (
                <Reveal key={tier.range} delay={i * 0.1}>
                  <div className="h-full rounded-2xl border border-black/5 bg-mist-50 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
                        {Icon && <Icon size={22} />}
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink-900">{tier.range}</h3>
                    </div>
                    <p className="mt-5 font-display text-4xl font-extrabold text-brand-600">{tier.value}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400">{tier.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">{t('pages.promotions.conditionsHeading')}</p>
            <p className="mt-5 leading-relaxed text-ink-400">{t('pages.promotions.conditionsDesc')}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ChecklistPanel heading={t('pages.promotions.conditionsPanelHeading')} items={conditions} />
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
