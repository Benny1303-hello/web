'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, PackageSearch, ShieldCheck, Phone, Mail } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import productsCatalog from '@/lib/productsCatalog.json';
import { distributionStaff } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

// Spec-group category headings translated to Vietnamese; the detailed field
// labels/values underneath stay in English (standard for technical UPS/rack
// datasheets, and the source data spans two different vendor taxonomies that
// aren't worth force-translating line by line without real accuracy risk).
const SPEC_GROUP_LABELS_VI = {
  Overview: 'Tổng quan',
  General: 'Thông tin chung',
  Main: 'Thông số chính',
  Physical: 'Kích thước & Vật lý',
  Input: 'Đầu vào',
  Output: 'Đầu ra',
  Conformance: 'Chứng nhận & Tiêu chuẩn',
  Environment: 'Môi trường',
  Environmental: 'Môi trường',
  'Batteries & Runtime': 'Pin & Thời gian hoạt động',
  'Communications & Management': 'Kết nối & Quản lý',
  Complementary: 'Thông số bổ sung',
  'Surge Protection and Filtering': 'Chống sét lan truyền & Lọc nhiễu',
  'Packing Units': 'Đóng gói',
  'Offer Sustainability': 'Phát triển bền vững',
  'Contractual warranty': 'Bảo hành',
};

export default function ProductDetailContent({ groupKey, slug }) {
  const { t, language } = useLanguage();
  const group = productsCatalog.groups.find((g) => g.key === groupKey);
  const product = productsCatalog.products.find((p) => p.group === groupKey && p.slug === slug);
  const salesTeam = distributionStaff.find((g) => g.groupKey === 'sales')?.members || [];
  const images = Array.isArray(product.images) ? product.images : [];
  const [activeImage, setActiveImage] = useState(images[0]);

  const hasOverview = Boolean(product.overview);
  const hasSpecGroups = Array.isArray(product.specGroups) && product.specGroups.length > 0;
  const hasSpecs = hasSpecGroups || (Array.isArray(product.specs) && product.specs.length > 0);
  const hasCompatible = Array.isArray(product.compatible_with) && product.compatible_with.length > 0;

  return (
    <>
      <PageHero
        crumb={product.part_number}
        eyebrow={group.title}
        title={product.name}
        description={product.overview || undefined}
      />

      <section className="bg-white py-12">
        <div className="container-page">
          <Link
            href={`/products/${groupKey}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft size={16} />
            {t('productCatalog.backToGroup')}
          </Link>
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            {images.length > 0 ? (
              <>
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-contain p-6"
                  />
                </div>
                {images.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {images.map((src) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveImage(src)}
                        className={`relative aspect-square overflow-hidden rounded-xl bg-white ring-1 transition-all ${
                          activeImage === src ? 'ring-2 ring-brand-500' : 'ring-black/5 hover:ring-brand-300'
                        }`}
                      >
                        <Image src={src} alt={product.name} fill sizes="120px" className="object-contain p-2" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-3xl bg-mist-50 text-ink-300 ring-1 ring-black/5">
                <PackageSearch size={56} />
                <p className="max-w-[220px] text-center text-xs text-ink-400">{t('productCatalog.imagePending')}</p>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-mist-50 px-4 py-3 text-sm ring-1 ring-black/5">
                <span className="font-medium text-ink-600">{t('productCatalog.partNumberLabel')}</span>
                <span className="font-semibold text-ink-900">{product.part_number}</span>
              </div>
              {product.warranty && (
                <div className="flex items-center justify-between rounded-xl bg-mist-50 px-4 py-3 text-sm ring-1 ring-black/5">
                  <span className="flex items-center gap-2 font-medium text-ink-600">
                    <ShieldCheck size={16} className="text-brand-500" />
                    {t('productCatalog.warrantyLabel')}
                  </span>
                  <span className="font-semibold text-ink-900">{product.warranty}</span>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {hasOverview && <p className="leading-relaxed text-ink-400">{product.overview}</p>}

            {hasSpecs && (
              <div className="mt-6">
                <h2 className="font-display text-lg font-bold text-navy-900">{t('productCatalog.specsHeading')}</h2>
                {hasSpecGroups ? (
                  <div className="mt-4 space-y-5">
                    {product.specGroups.map((group, gi) => (
                      <div key={`${group.group}-${gi}`}>
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                          {language === 'vi' ? SPEC_GROUP_LABELS_VI[group.group] || group.group : group.group}
                        </h3>
                        <dl className="mt-2 divide-y divide-black/5 rounded-2xl bg-mist-50 ring-1 ring-black/5">
                          {group.items.map((spec, i) => (
                            <div key={`${spec.label}-${i}`} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                              <dt className="text-sm font-medium text-ink-600">{spec.label}</dt>
                              <dd className="text-sm text-ink-900 sm:text-right">{spec.value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </div>
                ) : (
                  <dl className="mt-4 divide-y divide-black/5 rounded-2xl bg-mist-50 ring-1 ring-black/5">
                    {product.specs.map((spec, i) => (
                      <div key={`${spec.label}-${i}`} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <dt className="text-sm font-medium text-ink-600">{spec.label}</dt>
                        <dd className="text-sm text-ink-900 sm:text-right">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}
            {!hasSpecs && !hasOverview && <p className="text-sm text-ink-400">{t('productCatalog.noSpecs')}</p>}

            {hasCompatible && (
              <div className="mt-6">
                <h2 className="font-display text-lg font-bold text-navy-900">{t('productCatalog.compatibleHeading')}</h2>
                <ul className="mt-3 space-y-2">
                  {product.compatible_with.map((c) => (
                    <li key={c} className="rounded-lg bg-mist-50 px-4 py-2.5 text-sm text-ink-600 ring-1 ring-black/5">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 rounded-2xl bg-hero-mesh p-6 text-white">
              <h3 className="font-display text-base font-bold">{t('productCatalog.contactHeading')}</h3>
              <p className="mt-1 text-sm text-slate-300">{t('productCatalog.contactDesc')}</p>
              <div className="mt-4 space-y-3">
                {salesTeam.map((person) => (
                  <div key={person.key} className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="font-semibold text-white">{person.name}</span>
                    <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200">
                      <Phone size={14} />
                      {person.phone}
                    </a>
                    <a href={`mailto:${person.email}`} className="flex items-center gap-1.5 text-slate-300 hover:text-white">
                      <Mail size={14} />
                      {person.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
