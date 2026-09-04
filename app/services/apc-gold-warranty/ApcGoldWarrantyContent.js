'use client';

import Image from 'next/image';
import { CheckCircle2, Phone } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { consultingStaff } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function ApcGoldWarrantyContent() {
  const { t } = useLanguage();
  const benefits = t('pages.apcGoldWarranty.benefits');
  const hasBenefits = Array.isArray(benefits);
  // Hotline below is Giang's number — sourced from the shared staff record
  // so it can't drift out of sync if it ever changes there.
  const giang = consultingStaff[0].members.find((m) => m.key === 'giang');
  const giangTelHref = `tel:+84${giang.phone.replace(/\D/g, '').replace(/^0/, '')}`;

  return (
    <>
      <PageHero
        crumb={t('pages.apcGoldWarranty.hero.crumb')}
        eyebrow={t('pages.apcGoldWarranty.hero.eyebrow')}
        title={t('pages.apcGoldWarranty.hero.title')}
        description={t('pages.apcGoldWarranty.hero.description')}
      />

      <section className="bg-white py-20">
        <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">
              {t('pages.apcGoldWarranty.effectiveDate')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              {t('pages.apcGoldWarranty.policyHeading')}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-400">{t('pages.apcGoldWarranty.intro')}</p>

            {hasBenefits && (
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit.title} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-500" />
                    <div>
                      <p className="font-display font-bold text-ink-900">{benefit.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-400">{benefit.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 rounded-2xl bg-mist-50 p-6 ring-1 ring-black/5">
              <p className="text-sm font-semibold text-ink-900">{t('pages.apcGoldWarranty.contactNote')}</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
                <a
                  href="tel:+842838247066"
                  className="flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  <Phone size={16} />
                  {t('pages.apcGoldWarranty.phone1')}
                </a>
                <a
                  href={giangTelHref}
                  className="flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  <Phone size={16} />
                  {t('pages.apcGoldWarranty.phone2')}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-black/5">
              <Image
                src="/apc-gold-warranty.jpg"
                alt={t('pages.apcGoldWarranty.hero.title')}
                width={400}
                height={400}
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
