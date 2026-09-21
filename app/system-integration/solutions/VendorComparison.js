'use client';

import Reveal from '@/components/Reveal';
import ChecklistPanel from '@/components/ChecklistPanel';

export default function VendorComparison({ comparison }) {
  const { heading, intro, columns, rows, vendorLabels, detailsHeading, details, guidanceHeading, guidance } = comparison;
  const hasDetails = Array.isArray(details) && Array.isArray(vendorLabels);
  const hasGuidance = Array.isArray(guidance);

  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">{heading}</h2>
          {intro && <p className="mt-4 leading-relaxed text-ink-400">{intro}</p>}
        </Reveal>

        <Reveal delay={0.1} className="mt-10 overflow-x-auto rounded-2xl shadow-soft ring-1 ring-black/5">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-navy-950 text-white">
                {columns.map((col) => (
                  <th key={col} className="px-5 py-4 font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-mist-50' : 'bg-white'}>
                  <td className="px-5 py-4 align-top font-semibold text-ink-900">{row.label}</td>
                  <td className="px-5 py-4 align-top text-ink-400">{row.col1}</td>
                  <td className="px-5 py-4 align-top text-ink-400">{row.col2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {hasDetails && (
          <>
            {detailsHeading && (
              <Reveal className="mx-auto mt-16 max-w-2xl text-center">
                <h3 className="font-display text-2xl font-bold text-navy-900">{detailsHeading}</h3>
              </Reveal>
            )}
            <div className="mx-auto mt-8 max-w-5xl space-y-6">
              {details.map((detail, i) => (
                <Reveal key={detail.title} delay={i * 0.08}>
                  <div className="rounded-2xl bg-mist-50 p-7 ring-1 ring-black/5">
                    <h4 className="font-display text-lg font-bold text-ink-900">{detail.title}</h4>
                    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                      {[detail.col1, detail.col2].map((text, ci) => (
                        <div key={vendorLabels[ci]}>
                          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">{vendorLabels[ci]}</p>
                          <p className="mt-2 text-sm leading-relaxed text-ink-400">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {hasGuidance && (
          <>
            {guidanceHeading && (
              <Reveal className="mx-auto mt-16 max-w-2xl text-center">
                <h3 className="font-display text-2xl font-bold text-navy-900">{guidanceHeading}</h3>
              </Reveal>
            )}
            <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
              {guidance.map((option, i) => (
                <Reveal key={option.title} delay={i * 0.1} className="flex [&>div]:w-full">
                  <ChecklistPanel heading={option.title} items={option.items} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
