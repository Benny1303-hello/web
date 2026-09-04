'use client';

import { CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import ClientLogos from '@/components/ClientLogos';
import { ICONS } from '@/lib/icons';
import { systemIntegrationClients, systemIntegrationPartnerBrands } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function SystemIntegrationContent() {
  const { t } = useLanguage();
  const benefitsRaw = t('pages.systemIntegration.benefits');
  const processRaw = t('pages.systemIntegration.process');
  const criteriaRaw = t('pages.systemIntegration.criteria');
  const benefits = Array.isArray(benefitsRaw) ? benefitsRaw : [];
  const process = Array.isArray(processRaw) ? processRaw : [];
  const criteria = Array.isArray(criteriaRaw) ? criteriaRaw : [];

  return (
    <>
      <PageHero
        crumb={t('pages.systemIntegration.hero.crumb')}
        eyebrow={t('pages.systemIntegration.hero.eyebrow')}
        title={t('pages.systemIntegration.hero.title')}
        description={t('pages.systemIntegration.hero.description')}
      />

      <section className="bg-white py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">{t('pages.systemIntegration.whyEyebrow')}</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              {t('pages.systemIntegration.whyHeading')}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-400">{t('pages.systemIntegration.whyDesc')}</p>
            <ul className="mt-6 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-ink-600">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-500" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-hero-mesh p-8 text-white">
              <p className="text-xl font-bold uppercase tracking-[0.05em] text-cyan-300">{t('pages.systemIntegration.processHeading')}</p>
              <div className="mt-6 space-y-6">
                {process.map((step, i) => {
                  const Icon = ICONS[step.icon];
                  return (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                        {Icon && <Icon size={18} />}
                      </div>
                      <div>
                        <p className="font-display font-bold">
                          {i + 1}. {step.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-balance font-display text-2xl font-bold text-navy-900 md:text-3xl">
              {t('pages.systemIntegration.criteriaHeading')}
            </h2>
            <ul className="mt-6 space-y-3">
              {criteria.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-ink-600">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-500" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-balance font-display text-2xl font-bold text-navy-900 md:text-3xl">
              {t('pages.systemIntegration.partnersHeading')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-400">{t('pages.systemIntegration.partnersDesc')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {systemIntegrationPartnerBrands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex h-14 items-center justify-center rounded-xl bg-white px-5 ring-1 ring-black/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={brand.logo} alt={brand.name} className="h-6 w-auto max-w-[100px] object-contain" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ClientLogos clients={systemIntegrationClients} />

      <CtaBanner />
    </>
  );
}
