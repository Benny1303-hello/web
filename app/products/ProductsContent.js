'use client';

import { BatteryCharging, Cpu, Network, ServerCog, ShieldAlert, Wrench } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { useLanguage } from '@/context/LanguageContext';

const icons = [BatteryCharging, ServerCog, Network, ShieldAlert, Cpu, Wrench];

export default function ProductsContent() {
  const { t } = useLanguage();
  const productCategories = t('productCategories');

  return (
    <>
      <PageHero
        crumb={t('pages.products.hero.crumb')}
        eyebrow={t('pages.products.hero.eyebrow')}
        title={t('pages.products.hero.title')}
        description={t('pages.products.hero.description')}
      />

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((cat, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={cat.title} delay={(i % 3) * 0.08}>
                  <div className="group h-full rounded-2xl border border-black/5 bg-mist-50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-navy-950 hover:shadow-card">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-110">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-white">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400 transition-colors group-hover:text-slate-300">
                      {cat.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-16">
        <div className="container-page">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl bg-white p-10 text-center shadow-card ring-1 ring-black/5">
            <h2 className="text-balance font-display text-2xl font-bold !leading-relaxed text-navy-900 md:text-3xl">
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
