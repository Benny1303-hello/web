'use client';

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { navLinks, site } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

const LANGUAGES = ['vi', 'en'];

function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`flex items-center gap-1 text-sm font-semibold ${className}`} role="group" aria-label={t('common.language')}>
      {LANGUAGES.map((lang, i) => (
        <Fragment key={lang}>
          {i > 0 && <span className="text-slate-500">|</span>}
          <button
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={language === lang}
            className={`rounded-full px-2 py-1 transition-colors ${
              language === lang ? 'text-cyan-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-navy-950/95 shadow-soft backdrop-blur' : 'bg-navy-950'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center rounded-xl bg-white px-3 py-2 shadow-soft">
          <Image src="/logo.png" alt={site.name} width={148} height={80} className="h-10 w-auto" priority />
        </Link>

        <nav className="hidden items-center xl:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative whitespace-nowrap px-2.5 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-cyan-300"
              >
                {t(`nav.${link.key}`)}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-cyan-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <LanguageSwitcher />

          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-white"
            aria-label={site.phone}
          >
            <Phone size={16} className="text-cyan-300" />
            <span className="hidden 2xl:inline">{site.phone}</span>
          </a>

          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-glow transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {t('nav.requestConsult')}
          </Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            className="rounded-lg p-2 text-white"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 bg-navy-950 xl:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-white/10 text-cyan-300'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
              <a
                href={site.phoneHref}
                className="mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-white"
              >
                <Phone size={16} className="text-cyan-300" />
                {site.phone}
              </a>
              <Link
                href="/contact"
                className="mt-1 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 px-5 py-3 text-center text-sm font-semibold text-navy-950"
              >
                {t('nav.requestConsult')}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
