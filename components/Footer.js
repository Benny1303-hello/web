'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { navLinks, site, centers } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.01 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0012.01 22C17.53 22 22 17.52 22 12S17.53 2 12.01 2zm5.6 14.2c-.24.67-1.4 1.28-1.94 1.33-.5.05-1.03.24-3.44-.72-2.9-1.16-4.77-4.1-4.92-4.29-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.13.57.17.29.75 1.24 1.61 2 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.65-.14.26.1 1.67.79 1.96.93.29.14.48.21.55.33.07.12.07.69-.17 1.36z" />
    </svg>
  );
}

function ZaloIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.79 1.42 5.28 3.64 6.94-.12.9-.45 2.05-1.2 3.34a.4.4 0 00.5.58c1.55-.6 3.03-1.44 3.98-2.06.98.26 2.02.4 3.08.4 5.52 0 10-4.03 10-9s-4.48-9-10-9zm-4.5 6.75h3.94l-3.83 5.1h3.83v1.15H6.36l3.85-5.1H6.5V8.75zm7.1 0h1.2v6.25h-1.2V8.75zm2.9 0c1.24 0 2.25 1.4 2.25 3.13 0 1.72-1.01 3.12-2.25 3.12s-2.25-1.4-2.25-3.12c0-1.73 1.01-3.13 2.25-3.13zm0 1.15c-.58 0-1.05.87-1.05 1.98s.47 1.97 1.05 1.97 1.05-.87 1.05-1.97-.47-1.98-1.05-1.98z" />
    </svg>
  );
}

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
            {navLinks.map((link) => (
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
