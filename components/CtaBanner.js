'use client';

import { Mail, Phone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { site } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function CtaBanner() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-hero-mesh px-8 py-14 text-white sm:px-14">
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-balance font-display text-3xl font-bold leading-snug md:text-4xl">
                  {t('ctaBanner.heading')}
                </h2>
                <p className="mt-4 max-w-lg text-balance text-slate-300">{t('ctaBanner.description')}</p>
                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-semibold">
                    <Phone size={16} className="text-cyan-300" />
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm font-semibold">
                    <Mail size={16} className="text-cyan-300" />
                    {site.email}
                  </a>
                </div>
              </div>
              <div className="flex justify-start lg:justify-end">
                <Button href="/contact" variant="amber">
                  {t('ctaBanner.cta')}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
