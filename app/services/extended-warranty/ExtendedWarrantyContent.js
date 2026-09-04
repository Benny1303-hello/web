'use client';

import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import ChecklistPanel from '@/components/ChecklistPanel';
import CommitmentsGrid from '@/components/CommitmentsGrid';
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
            <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">{t('pages.extendedWarranty.overviewHeading')}</p>
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
              <ChecklistPanel heading={t('pages.extendedWarranty.coverageHeading')} items={coverage} />
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

            <CommitmentsGrid commitments={commitments} />
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
