'use client';

import { CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { useLanguage } from '@/context/LanguageContext';

export default function ExtendedWarrantyContent() {
  const { t } = useLanguage();
  const overview = t('pages.extendedWarranty.overview');
  const coverage = t('pages.extendedWarranty.coverage');
  const commitments = t('pages.extendedWarranty.commitments');

  const hasOverview = Array.isArray(overview);
  const hasCoverage = Array.isArray(coverage);
  const hasCommitments = Array.isArray(commitments);

  return (
    <>
      <PageHero
        crumb={t('pages.extendedWarranty.hero.crumb')}
        eyebrow={t('pages.extendedWarranty.hero.eyebrow')}
        title={t('pages.extendedWarranty.hero.title')}
        description={t('pages.extendedWarranty.hero.description')}
      />

      <section className="bg-white py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{t('pages.extendedWarranty.overviewHeading')}</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              {t('pages.extendedWarranty.solutionDesc')}
            </h2>
            {hasOverview && (
              <div className="mt-5 space-y-4">
                {overview.map((para, i) => (
                  <p key={i} className="leading-relaxed text-ink-400">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </Reveal>

          {hasCoverage && (
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-hero-mesh p-8 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {t('pages.extendedWarranty.coverageHeading')}
                </p>
                <ul className="mt-6 space-y-3">
                  {coverage.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {hasCommitments && (
        <section className="bg-mist-50 py-20">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
                {t('pages.extendedWarranty.commitmentsHeading')}
              </h2>
            </Reveal>

            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {commitments.map((commitment, i) => (
                <Reveal
                  key={commitment.title}
                  delay={i * 0.08}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="h-full rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5">
                    <h3 className="font-display text-base font-bold text-ink-900">{commitment.title}</h3>
                    <ul className="mt-3 space-y-2">
                      {commitment.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-ink-400">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
