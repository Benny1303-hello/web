'use client';

import {
  HardDrive,
  Network,
  ServerCrash,
  DatabaseBackup,
  MonitorSmartphone,
  Headset,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { useLanguage } from '@/context/LanguageContext';

const icons = [HardDrive, Network, ServerCrash, DatabaseBackup, MonitorSmartphone, Headset];

export default function ServicesContent() {
  const { t } = useLanguage();
  const services = t('pages.services.items');

  return (
    <>
      <PageHero
        crumb={t('pages.services.hero.crumb')}
        eyebrow={t('pages.services.hero.eyebrow')}
        title={t('pages.services.hero.title')}
        description={t('pages.services.hero.description')}
      />

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={service.title} delay={(i % 3) * 0.08}>
                  <div className="group h-full rounded-2xl border border-black/5 bg-mist-50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-navy-950 hover:shadow-card">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400 transition-colors group-hover:text-slate-300">
                      {service.desc}
                    </p>
                  </div>
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
