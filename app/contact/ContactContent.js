'use client';

import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import FacebookPagePlugin from '@/components/FacebookPagePlugin';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import ZaloIcon from '@/components/ZaloIcon';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { site } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactContent() {
  const { t, language } = useLanguage();

  const cards = [
    { icon: MapPin, key: 'address', value: t('pages.contact.addressValue'), href: site.mapHref },
    { icon: Phone, key: 'phone', value: site.phone, href: site.phoneHref },
    { icon: Mail, key: 'email', value: site.email, href: `mailto:${site.email}` },
  ];

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

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {[
              { key: 'facebook', href: site.facebook, icon: Facebook },
              { key: 'zalo', href: site.zalo, icon: ZaloIcon },
              { key: 'whatsapp', href: site.whatsapp, icon: WhatsAppIcon },
            ].map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-mist-50 px-4 py-2 text-sm font-semibold text-ink-900 ring-1 ring-black/5 transition-colors hover:text-brand-600"
              >
                <s.icon width={16} height={16} />
                {t(`common.${s.key}`)}
              </a>
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
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="container-page flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
          <Reveal className="max-w-xl text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">
              {t('pages.contact.facebook.eyebrow')}
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-ink-900 md:text-4xl">
              {t('pages.contact.facebook.title')}
            </h2>
            <p className="mt-4 text-ink-400">{t('pages.contact.facebook.description')}</p>
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 px-7 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <Facebook size={16} />
              {t('pages.contact.facebook.cta')}
            </a>
          </Reveal>
          <FacebookPagePlugin
            pageUrl={site.facebook}
            title={t('pages.contact.facebook.frameTitle')}
            locale={language === 'en' ? 'en_US' : 'vi_VN'}
          />
        </div>
      </section>
    </>
  );
}
