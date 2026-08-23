'use client';

import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { serviceClients } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function ClientLogos() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            {t('clientsSection.eyebrow')}
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
            {t('clientsSection.heading')}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {serviceClients.map((client, i) => (
            <Reveal key={client.name} delay={i * 0.04}>
              <div className="flex h-24 items-center justify-center rounded-2xl bg-mist-50 p-5 ring-1 ring-black/5">
                <Image
                  src={client.image}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="h-auto max-h-14 w-full object-contain"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
