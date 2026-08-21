'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { navLinks, site, centers } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
        <div>
          <div className="mb-4 inline-flex rounded-xl bg-white px-3 py-2">
            <Image src="/logo.png" alt={site.name} width={148} height={80} className="h-10 w-auto" />
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{t('footer.description')}</p>
          <a
            href={site.facebook}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-200 transition-colors hover:bg-cyan-400 hover:text-navy-950"
            aria-label={t('common.facebook')}
          >
            <Facebook size={16} />
          </a>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t('footer.navHeading')}</h4>
          <ul className="space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
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
              <span>{site.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-cyan-300" />
              <a href={site.phoneHref} className="transition-colors hover:text-cyan-300">{site.phone}</a>
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
          © {new Date().getFullYear()} {site.fullName}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
