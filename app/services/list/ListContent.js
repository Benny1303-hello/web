'use client';

import Link from 'next/link';
import { Wrench, ServerCrash, Zap, Network, ShieldCheck, Truck, PenTool, Users2, ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { serviceCapabilities } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

const icons = { Wrench, ServerCrash, Zap, Network, ShieldCheck, Truck, PenTool, Users2 };

export default function ListContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        crumb={t('pages.servicesList.hero.crumb')}
        eyebrow={t('pages.servicesList.hero.eyebrow')}
        title={t('pages.servicesList.hero.title')}
        description={t('pages.servicesList.hero.description')}
      />

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCapabilities.map((service, i) => {
              const Icon = icons[service.icon];
              const href = service.href || (service.slug ? `/services/list/${service.slug}` : null);
              const cardClass =
                'group h-full rounded-2xl border border-black/5 bg-mist-50 p-7 transition-all duration-300' +
                (href ? ' hover:-translate-y-1.5 hover:border-transparent hover:bg-navy-950 hover:shadow-card' : '');

              const content = (
                <>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-white">
                      {t(`pages.servicesList.items.${service.key}.title`)}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400 transition-colors group-hover:text-slate-300">
                    {t(`pages.servicesList.items.${service.key}.desc`)}
                  </p>
                  {href && (
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors group-hover:text-cyan-300">
                      {t('centersSection.viewMore')}
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  )}
                </>
              );

              return (
                <Reveal key={service.key} delay={(i % 3) * 0.08}>
                  {href ? (
                    <Link href={href} className={`flex flex-col ${cardClass}`}>
                      {content}
                    </Link>
                  ) : (
                    <div className={cardClass}>{content}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
