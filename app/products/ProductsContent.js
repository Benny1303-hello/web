'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import ProductSearchInput from '@/components/ProductSearchInput';
import { ICONS } from '@/lib/icons';
import { matchesProductQuery } from '@/lib/productSearch';
import { useLanguage } from '@/context/LanguageContext';

const MAX_SEARCH_RESULTS = 8;

export default function ProductsContent({ groups, searchIndex, countByGroup }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { matches: [], total: 0 };
    const all = searchIndex.filter((p) => matchesProductQuery(p, q));
    return { matches: all.slice(0, MAX_SEARCH_RESULTS), total: all.length };
  }, [searchIndex, query]);
  const isSearching = query.trim().length > 0;

  return (
    <>
      <PageHero
        crumb={t('pages.products.hero.crumb')}
        eyebrow={t('pages.products.hero.eyebrow')}
        title={t('pages.products.hero.title')}
        description={t('pages.products.hero.description')}
      />

      <section className="bg-white pt-16">
        <div className="container-page">
          <Reveal className="relative mx-auto max-w-xl">
            <ProductSearchInput value={query} onChange={setQuery} placeholder={t('productCatalog.searchPlaceholder')} />

            {isSearching && (
              <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5">
                {searchResults.matches.length > 0 ? (
                  <>
                    <ul className="divide-y divide-black/5">
                      {searchResults.matches.map((p) => (
                        <li key={`${p.group}-${p.slug}`}>
                          <Link
                            href={`/products/${p.group}/${p.slug}`}
                            className="flex flex-col gap-0.5 px-5 py-3 transition-colors hover:bg-mist-50"
                          >
                            <span className="text-sm font-bold text-ink-900">{p.part_number}</span>
                            <span className="text-xs text-ink-400">{p.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {searchResults.total > MAX_SEARCH_RESULTS && (
                      <p className="border-t border-black/5 px-5 py-2.5 text-xs text-ink-400">
                        {t('productCatalog.searchMoreResults', { n: searchResults.total - MAX_SEARCH_RESULTS })}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="px-5 py-4 text-sm text-ink-400">{t('productCatalog.searchNoResults')}</p>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-white pb-20 pt-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              {t('productCatalog.groupsHeading')}
            </h2>
          </Reveal>

          <div className="mt-14 flex flex-wrap justify-center gap-6">
            {groups.map((group, i) => {
              const Icon = ICONS[group.icon];
              return (
                <Reveal key={group.key} delay={i * 0.1} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <Link
                    href={`/products/${group.key}`}
                    className="group flex h-full flex-col rounded-2xl border border-black/5 bg-mist-50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-navy-950 hover:shadow-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-110">
                        {Icon && <Icon size={20} />}
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-white">
                        {group.title}
                      </h3>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-400 transition-colors group-hover:text-slate-300">
                      {group.desc}
                    </p>
                    <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600 transition-colors group-hover:text-cyan-300">
                      {countByGroup[group.key] || 0} {t('productCatalog.productsSuffix')}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors group-hover:text-cyan-300">
                      {t('productCatalog.viewGroup')}
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-16">
        <div className="container-page">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl bg-white p-10 text-center shadow-card ring-1 ring-black/5">
            <h2 className="text-balance font-display text-2xl font-bold text-navy-900 md:text-3xl">
              {t('pages.products.ctaHeading')}
            </h2>
            <p className="max-w-xl text-balance leading-relaxed text-ink-400">{t('pages.products.ctaDesc')}</p>
            <Button href="/contact" variant="primary">
              {t('pages.products.ctaButton')}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
