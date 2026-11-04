'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import ZaloIcon from '@/components/ZaloIcon';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { navLinks, site, centers } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

// The three centers get their own footer list below, so they're dropped from
// this one. Derived from `centers` rather than a hardcoded key list, so
// renaming a center's key in lib/content.js can't silently make it show up in
// both lists.
const centerKeys = new Set(centers.map((center) => center.key));
const footerNavLinks = navLinks.filter((link) => !centerKeys.has(link.key));

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
        <div>
          <Image src="/logo.png" alt={site.name} width={148} height={80} className="mb-4 h-10 w-auto" />
          <p className="text-sm leading-relaxed text-slate-400">{t('footer.description')}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-200 transition-colors hover:bg-cyan-400 hover:text-navy-950"
              aria-label={t('common.facebook')}
            >
              <Facebook size={16} />
            </a>
            <a
              href={site.zalo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-200 transition-colors hover:bg-cyan-400 hover:text-navy-950"
              aria-label={t('common.zalo')}
            >
              <ZaloIcon width={16} height={16} />
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-200 transition-colors hover:bg-cyan-400 hover:text-navy-950"
              aria-label={t('common.whatsapp')}
            >
              <WhatsAppIcon width={16} height={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t('footer.navHeading')}</h4>
          <ul className="space-y-3 text-sm">
            {footerNavLinks.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="transition-colors hover:text-cyan-300">
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t('footer.servicesHeading')}</h4>
          <ul className="space-y-3 text-sm">
            {centers.map((center) => (
              <li key={center.slug}>
                <Link href={`/${center.slug}`} className="transition-colors hover:text-cyan-300">
                  {t(`centers.${center.key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t('footer.contactHeading')}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-cyan-300" />
              <span>{t('pages.contact.addressValue')}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-cyan-300" />
              <a href={site.phoneHref} className="transition-colors hover:text-cyan-300">{site.phone}</a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label={t('common.whatsapp')}
                className="text-slate-400 transition-colors hover:text-cyan-300"
              >
                <WhatsAppIcon width={16} height={16} />
              </a>
              <a
                href={site.zalo}
                target="_blank"
                rel="noreferrer"
                aria-label={t('common.zalo')}
                className="text-slate-400 transition-colors hover:text-cyan-300"
              >
                <ZaloIcon width={16} height={16} />
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-cyan-300" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-cyan-300">{site.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-page text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {t('footer.companyFullName')}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
