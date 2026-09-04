'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import ClientLogos from '@/components/ClientLogos';
import CtaBanner from '@/components/CtaBanner';
import { useLanguage } from '@/context/LanguageContext';

export default function ServiceOfferingDetailContent({ offeringKey }) {
  const { t } = useLanguage();
  const base = `pages.serviceOfferingDetail.${offeringKey}`;
  const overview = t(`${base}.overview`);
  const sections = t(`${base}.sections`);
  const listHeading = t(`${base}.listHeading`);
  const list = t(`${base}.list`);
  const hasClientLogos = t(`${base}.hasClientLogos`) === true;

  const hasOverview = Array.isArray(overview);
  const hasSections = Array.isArray(sections);
  const hasList = Array.isArray(list);

  // Tracks the background of whichever optional section rendered last, so the
  // closing "back to services" section can always alternate against it —
  // including when none of the optional sections render at all (repair,
  // maintenance) and the overview's bg-white would otherwise repeat.
  const lastSectionIsWhite = hasClientLogos || (hasList ? hasSections : !hasSections);
  const backLinkBg = lastSectionIsWhite ? 'bg-mist-50' : 'bg-white';

  return (
    <>
      <PageHero
        crumb={t(`${base}.hero.crumb`)}
        eyebrow={t(`${base}.hero.eyebrow`)}
        title={t(`${base}.hero.title`)}
        description={t(`${base}.hero.description`)}
      />

      <section className="bg-white py-20">
        <div className="container-page mx-auto max-w-3xl">
          <Reveal>
            <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">{t(`${base}.overviewHeading`)}</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">{t(`${base}.solutionDesc`)}</h2>
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
        </div>
      </section>

      {hasSections && (
        <section className="bg-mist-50 py-20">
          <div className="container-page mx-auto max-w-3xl space-y-10">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.1}>
                <h3 className="font-display text-xl font-bold text-navy-900">{section.title}</h3>
                <div className="mt-3 space-y-3">
                  {Array.isArray(section.paragraphs) && section.paragraphs.map((para, pi) => (
                    <p key={pi} className="text-sm leading-relaxed text-ink-400">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {hasList && (
        <section className={hasSections ? 'bg-white py-20' : 'bg-mist-50 py-20'}>
          <div className="container-page mx-auto max-w-3xl">
            <Reveal>
              <h3 className="font-display text-xl font-bold text-navy-900">{listHeading}</h3>
              <ul className="mt-6 space-y-3">
                {list.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-600">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {hasClientLogos && <ClientLogos />}

      <section className={`${backLinkBg} pb-4 pt-12`}>
        <div className="container-page text-center">
          <Link
            href="/services/list"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft size={16} />
            {t('pages.serviceOfferingDetail.backToServices')}
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
