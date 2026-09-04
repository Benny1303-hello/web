'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, PackageSearch } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import ProductSearchInput from '@/components/ProductSearchInput';
import { useLanguage } from '@/context/LanguageContext';
import { matchesProductQuery } from '@/lib/productSearch';

export default function ProductGroupContent({ group, products: allProducts }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allProducts;
    return allProducts.filter((p) => matchesProductQuery(p, q));
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
            <ProductSearchInput value={query} onChange={setQuery} placeholder={t('productCatalog.searchPlaceholder')} />
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
                    <div
                      className={`relative flex h-32 w-full items-center justify-center rounded-xl ring-1 ring-black/5 transition-colors ${
                        Array.isArray(p.images) && p.images.length > 0
                          ? 'bg-white'
                          : 'bg-white text-ink-300 group-hover:bg-white/10 group-hover:text-white/40'
                      }`}
                    >
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
