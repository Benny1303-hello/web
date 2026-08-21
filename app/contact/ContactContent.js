'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

const cards = [
  { icon: MapPin, key: 'address', value: site.address, href: site.mapHref },
  { icon: Phone, key: 'phone', value: site.phone, href: site.phoneHref },
  { icon: Mail, key: 'email', value: site.email, href: `mailto:${site.email}` },
];

export default function ContactContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        crumb={t('pages.contact.hero.crumb')}
        eyebrow={t('pages.contact.hero.eyebrow')}
        title={t('pages.contact.hero.title')}
        description={t('pages.contact.hero.description')}
      />

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((card, i) => (
              <Reveal key={card.key} delay={i * 0.08}>
                <a
                  href={card.href}
                  target={card.key === 'address' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex h-full items-center gap-3 rounded-2xl bg-mist-50 p-6 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
                    <card.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{t(`pages.contact.cards.${card.key}`)}</p>
                    <p className="mt-1 text-sm text-ink-400">{card.value}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <ContactForm />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full min-h-[320px] overflow-hidden rounded-2xl shadow-card ring-1 ring-black/5">
                <iframe
                  title={t('common.mapTitle')}
                  className="h-full min-h-[320px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=58%20Mac%20Dinh%20Chi%20Street%2C%20District%201%2C%20Ho%20Chi%20Minh%20City&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
