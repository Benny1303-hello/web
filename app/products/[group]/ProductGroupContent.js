'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, PackageSearch, Search } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import productsCatalog from '@/lib/productsCatalog.json';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductGroupContent({ groupKey }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const group = productsCatalog.groups.find((g) => g.key === groupKey);
  const allProducts = productsCatalog.products.filter((p) => p.group === groupKey);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allProducts;
    return allProducts.filter((p) => p.part_number.toLowerCase().includes(q) || p.name.toLowerCase().includes(q));
  }, [allProducts, query]);

  const sections = [];
  const sectionIndex = {};
  for (const p of products) {
    if (!(p.category_label in sectionIndex)) {
      sectionIndex[p.category_label] = sections.length;
      sections.push({ label: p.category_label, products: [] });
    }
    sections[sectionIndex[p.category_label]].products.push(p);
  }

  return (
    <>
      <PageHero crumb={group.title} eyebrow={t('pages.products.hero.eyebrow')} title={group.title} description={group.desc} />

      <section className="bg-white py-12">
        <div className="container-page">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft size={16} />
            {t('productCatalog.backToGroups')}
          </Link>

          <Reveal className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-300" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('productCatalog.searchPlaceholder')}
                className="w-full rounded-full border border-black/10 bg-mist-50 py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {sections.length === 0 && (
        <section className="bg-white pb-16">
          <div className="container-page text-center">
            <p className="text-sm text-ink-400">{t('productCatalog.searchNoResults')}</p>
          </div>
        </section>
      )}

      {sections.map((section, si) => (
        <section key={section.label} className={si % 2 === 0 ? 'bg-white pb-16' : 'bg-mist-50 py-16'}>
          <div className="container-page">
            <Reveal>
              <h2 className="font-display text-xl font-bold text-navy-900">{section.label}</h2>
            </Reveal>

            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {section.products.map((p, i) => (
                <Reveal
                  key={`${p.group}-${p.slug}`}
                  delay={(i % 6) * 0.05}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <Link
                    href={`/products/${p.group}/${p.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-black/5 bg-mist-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-navy-950 hover:shadow-card"
                  >
                    <div className="relative flex h-32 w-full items-center justify-center rounded-xl bg-white text-ink-300 ring-1 ring-black/5 transition-colors group-hover:bg-white/10 group-hover:text-white/40">
                      {Array.isArray(p.images) && p.images.length > 0 ? (
                        <Image src={p.images[0]} alt={p.name} fill sizes="200px" className="object-contain p-4" />
                      ) : (
                        <PackageSearch size={32} />
                      )}
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold leading-snug text-ink-900 transition-colors group-hover:text-white">
                      {p.part_number}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400 transition-colors group-hover:text-slate-300">
                      {p.name}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition-colors group-hover:text-cyan-300">
                      {t('centersSection.viewMore')}
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
