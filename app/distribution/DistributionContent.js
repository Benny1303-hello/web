'use client';

import { Phone, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { distributionStaff } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function DistributionContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        crumb={t('pages.distribution.hero.crumb')}
        eyebrow={t('pages.distribution.hero.eyebrow')}
        title={t('pages.distribution.hero.title')}
        description={t('pages.distribution.hero.description')}
      />

      <section className="bg-white py-12">
        <div className="container-page">
          <Reveal>
            <Link
              href="/products"
              className="group flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-400 px-7 py-5 text-navy-950 shadow-glow transition-transform duration-200 hover:scale-[1.01]"
            >
              <span className="font-display text-lg font-bold">{t('pages.distribution.viewProducts')}</span>
              <ArrowRight size={20} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{t('pages.distribution.contactEyebrow')}</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              {t('pages.distribution.contactHeading')}
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 max-w-4xl space-y-12">
            {distributionStaff.map((group) => (
              <div key={group.groupKey}>
                <h3 className="mb-5 font-display text-lg font-bold text-navy-900">
                  {t(`pages.distribution.staffGroups.${group.groupKey}`)}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {group.members.map((contact, i) => (
                    <Reveal key={contact.name} delay={i * 0.06}>
                      <div className="h-full rounded-xl bg-white px-6 py-5 shadow-soft ring-1 ring-black/5">
                        <span className="font-medium text-ink-900">{contact.name}</span>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-600">
                          {t(`pages.distribution.staffRoles.${contact.id}`)}
                        </p>
                        <div className="mt-3 flex flex-col gap-1.5">
                          <a
                            href={`tel:${contact.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                          >
                            <Phone size={14} />
                            {contact.phone}
                          </a>
                          {contact.email && (
                            <a
                              href={`mailto:${contact.email}`}
                              className="flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-brand-600"
                            >
                              <Mail size={14} />
                              {contact.email}
                            </a>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
