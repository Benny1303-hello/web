'use client';

import Link from 'next/link';
import { Building2, ShieldCheck, Server, ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { systemIntegrationSolutions } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

const icons = { Building2, ShieldCheck, Server };

export default function SolutionsContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        crumb={t('pages.systemIntegrationSolutions.hero.crumb')}
        eyebrow={t('pages.systemIntegrationSolutions.hero.eyebrow')}
        title={t('pages.systemIntegrationSolutions.hero.title')}
        description={t('pages.systemIntegrationSolutions.hero.description')}
      />

      <section className="bg-white py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {t('pages.systemIntegrationSolutions.intro.eyebrow')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              {t('pages.systemIntegrationSolutions.intro.heading')}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-400">{t('pages.systemIntegrationSolutions.intro.desc')}</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {systemIntegrationSolutions.map((solution, i) => {
              const Icon = icons[solution.icon];
              return (
                <Reveal key={solution.key} delay={i * 0.1}>
                  <Link
                    href={`/system-integration/solutions/${solution.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-black/5 bg-mist-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:bg-navy-950 hover:shadow-card"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-110">
                        <Icon size={22} />
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-white">
                        {t(`pages.systemIntegrationSolutions.items.${solution.key}.title`)}
                      </h3>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-ink-400 transition-colors group-hover:text-slate-300">
                      {t(`pages.systemIntegrationSolutions.items.${solution.key}.short`)}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors group-hover:text-cyan-300">
                      {t('centersSection.viewMore')}
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
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
