'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { useLanguage } from '@/context/LanguageContext';

export default function SolutionDetailContent({ solutionKey }) {
  const { t } = useLanguage();
  const base = `pages.systemIntegrationSolutionDetail.${solutionKey}`;
  const targets = t('pages.systemIntegrationSolutionDetail.sharedTargets');
  const sections = t(`${base}.sections`);
  const categories = t(`${base}.categories`);
  const tableRows = t(`${base}.tableRows`);
  const servicesList = t(`${base}.servicesList`);
  const commitments = t(`${base}.commitments`);
  const deploymentTable = t(`${base}.deploymentTable`);
  const closingNote = t(`${base}.closingNote`);

  const hasTargets = Array.isArray(targets);
  const hasSections = Array.isArray(sections);
  const hasCategories = Array.isArray(categories);
  const hasTable = Array.isArray(tableRows);
  const hasServicesList = Array.isArray(servicesList);
  const hasCommitments = Array.isArray(commitments);
  const hasDeploymentTable = deploymentTable && Array.isArray(deploymentTable.rows) && Array.isArray(deploymentTable.columns);
  const hasClosingNote = Array.isArray(closingNote);

  return (
    <>
      <PageHero
        crumb={t(`${base}.hero.crumb`)}
        eyebrow={t(`${base}.hero.eyebrow`)}
        title={t(`${base}.hero.title`)}
        description={t(`${base}.hero.description`)}
      />

      <section className="bg-white py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{t(`${base}.overviewHeading`)}</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">{t(`${base}.solutionDesc`)}</h2>
            <p className="mt-5 leading-relaxed text-ink-400">{t(`${base}.overview`)}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-hero-mesh p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {t('pages.systemIntegrationSolutionDetail.sharedTargetsHeading')}
              </p>
              <ul className="mt-6 space-y-3">
                {hasTargets &&
                  targets.map((target) => (
                    <li key={target} className="flex items-start gap-3 text-sm text-slate-200">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                      {target}
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {(hasSections || hasCategories) && (
        <section className="bg-mist-50 py-20">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
                {t(`${base}.sectionsHeading`)}
              </h2>
            </Reveal>

            {hasSections && (
              <div className="mx-auto mt-12 max-w-3xl space-y-6">
                {sections.map((section, i) => (
                  <Reveal key={section.title} delay={i * 0.08}>
                    <div className="rounded-2xl bg-white p-7 shadow-soft ring-1 ring-black/5">
                      <div className="flex items-start gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 text-sm font-bold text-white">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-bold text-ink-900">{section.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-ink-400">{section.desc}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {hasCategories && (
              <div className="mx-auto mt-12 max-w-4xl space-y-10">
                {categories.map((category, ci) => (
                  <Reveal key={category.title} delay={ci * 0.1}>
                    <div>
                      <h3 className="font-display text-xl font-bold text-navy-900">{category.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-400">{category.desc}</p>
                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {category.items.map((item) => (
                          <div key={item.title} className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5">
                            <h4 className="font-display text-base font-bold text-ink-900">{item.title}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-ink-400">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {hasServicesList && (
        <section className="bg-white py-20">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
                {t(`${base}.servicesListHeading`)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">{t(`${base}.servicesListIntro`)}</p>
            </Reveal>

            <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
              <ul className="space-y-3 rounded-2xl bg-mist-50 p-7 ring-1 ring-black/5">
                {servicesList.map((item) => (
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

      {hasTable && (
        <section className="bg-white py-20">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
                {t('pages.systemIntegrationSolutionDetail.tableHeading')}
              </h2>
              <p className="mt-3 text-sm font-medium text-ink-400">{t(`${base}.tableIntro`)}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 overflow-x-auto rounded-2xl shadow-soft ring-1 ring-black/5">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-navy-950 text-white">
                    <th className="px-5 py-4 font-semibold"> </th>
                    <th className="px-5 py-4 font-semibold">{t(`${base}.tableCol1`)}</th>
                    <th className="px-5 py-4 font-semibold">{t(`${base}.tableCol2`)}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-mist-50' : 'bg-white'}>
                      <td className="px-5 py-4 font-semibold text-ink-900">{row.label}</td>
                      <td className="px-5 py-4 text-ink-400">{row.col1}</td>
                      <td className="px-5 py-4 text-brand-600">{row.col2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            {hasClosingNote && (
              <Reveal delay={0.15} className="mx-auto mt-8 max-w-3xl space-y-3">
                {closingNote.map((note, i) => (
                  <p key={i} className="text-sm leading-relaxed text-ink-400">{note}</p>
                ))}
              </Reveal>
            )}
          </div>
        </section>
      )}

      {!hasTable && hasClosingNote && (
        <section className="bg-white py-20">
          <div className="container-page">
            <Reveal className="mx-auto max-w-3xl space-y-3">
              {closingNote.map((note, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink-400">{note}</p>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {(hasCommitments || hasDeploymentTable) && (
        <section className="bg-mist-50 py-20">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
                {t(`${base}.commitmentsHeading`)}
              </h2>
            </Reveal>

            {hasDeploymentTable && (
              <Reveal delay={0.05} className="mx-auto mt-10 max-w-4xl">
                <h3 className="text-center font-display text-lg font-bold text-navy-900">{deploymentTable.heading}</h3>
                <div className="mt-5 overflow-x-auto rounded-2xl shadow-soft ring-1 ring-black/5">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-navy-950 text-white">
                        {deploymentTable.columns.map((col) => (
                          <th key={col} className="px-5 py-4 font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {deploymentTable.rows.map((row, i) => (
                        <tr key={row.cells[0]} className={i % 2 === 0 ? 'bg-white' : 'bg-mist-50'}>
                          {row.cells.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`whitespace-pre-line px-5 py-4 align-top ${
                                ci === 0 ? 'font-semibold text-ink-900' : 'text-ink-400'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {deploymentTable.note && (
                  <p className="mt-4 text-center text-xs text-ink-400">{deploymentTable.note}</p>
                )}
              </Reveal>
            )}

            {hasCommitments && (
              <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
                {commitments.map((commitment, i) => (
                  <Reveal key={commitment.title} delay={i * 0.08}>
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
            )}
          </div>
        </section>
      )}

      <section className={hasTable || hasCommitments || hasDeploymentTable || hasClosingNote ? 'bg-white pb-4' : 'bg-mist-50 py-12'}>
        <div className="container-page text-center">
          <Link
            href="/system-integration/solutions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft size={16} />
            {t('pages.systemIntegrationSolutionDetail.backToSolutions')}
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
