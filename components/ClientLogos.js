'use client';

import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { serviceClients } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function ClientLogos({ clients = serviceClients }) {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">
            {t('clientsSection.eyebrow')}
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
            {t('clientsSection.heading')}
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {clients.map((client, i) => (
            <Reveal
              key={client.name}
              delay={i * 0.04}
              className="w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-20px)]"
            >
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
