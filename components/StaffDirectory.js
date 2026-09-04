'use client';

import { Phone, Mail } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { useLanguage } from '@/context/LanguageContext';

export default function StaffDirectory({ tPrefix, groups }) {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        crumb={t(`${tPrefix}.hero.crumb`)}
        eyebrow={t(`${tPrefix}.hero.eyebrow`)}
        title={t(`${tPrefix}.hero.title`)}
        description={t(`${tPrefix}.hero.description`)}
      />

      <section className="bg-mist-50 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xl font-bold uppercase tracking-[0.05em] text-brand-600">{t(`${tPrefix}.contactEyebrow`)}</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              {t(`${tPrefix}.contactHeading`)}
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 max-w-4xl space-y-12">
            {groups.map((group) => (
              <div key={group.groupKey}>
                <h3 className="mb-5 font-display text-lg font-bold text-navy-900">
                  {t(`${tPrefix}.staffGroups.${group.groupKey}`)}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {group.members.map((contact, i) => (
                    <Reveal key={contact.key} delay={i * 0.06}>
                      <div className="h-full rounded-xl bg-white px-6 py-5 shadow-soft ring-1 ring-black/5">
                        <span className="font-medium text-ink-900">{contact.name}</span>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-600">
                          {t(`${tPrefix}.staffRoles.${contact.key}`)}
                        </p>
                        <div className="mt-3 flex flex-col gap-1.5">
                          <a
                            href={`tel:${contact.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                          >
                            <Phone size={14} />
                            {contact.phone}
                          </a>
                          {contact.email && (
                            <a
                              href={`mailto:${contact.email}`}
                              className="flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-brand-600"
                            >
                              <Mail size={14} />
                              {contact.email}
                            </a>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
