'use client';

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, ChevronRight } from 'lucide-react';
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
  const [openMobileKey, setOpenMobileKey] = useState(null);
  const [openMobileSubKey, setOpenMobileSubKey] = useState(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMobileKey(null);
    setOpenMobileSubKey(null);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-navy-950/95 shadow-soft backdrop-blur' : 'bg-navy-950'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image src="/logo.png" alt={site.name} width={148} height={80} className="h-12 w-auto" priority />
        </Link>

        <nav className="hidden items-center xl:flex">
          {navLinks.map((link) => {
            if (link.children) {
              const childActive = link.children.some(
                (child) => child.href === pathname || child.children?.some((c) => c.href === pathname)
              );
              return (
                <div key={link.key} className="group relative">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-sm font-medium transition-colors hover:text-cyan-300 ${
                      childActive ? 'text-cyan-300' : 'text-slate-200'
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                    <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-1 rounded-xl bg-white p-2 opacity-0 shadow-card ring-1 ring-black/5 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {link.children.map((child) =>
                      child.children ? (
                        <div key={child.href} className="group/nested relative">
                          <Link
                            href={child.href}
                            className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                              pathname === child.href || child.children.some((c) => c.href === pathname)
                                ? 'bg-mist-50 text-brand-600'
                                : 'text-ink-700 hover:bg-mist-50 hover:text-brand-600'
                            }`}
                          >
                            {t(`nav.${child.key}`)}
                            <ChevronRight size={14} className="shrink-0" />
                          </Link>

                          <div className="invisible absolute left-full top-0 z-50 ml-1 w-60 rounded-xl bg-white p-2 opacity-0 shadow-card ring-1 ring-black/5 transition-all duration-200 group-hover/nested:visible group-hover/nested:opacity-100">
                            {child.children.map((grandchild) => (
                              <Link
                                key={grandchild.href}
                                href={grandchild.href}
                                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                  pathname === grandchild.href
                                    ? 'bg-mist-50 text-brand-600'
                                    : 'text-ink-700 hover:bg-mist-50 hover:text-brand-600'
                                }`}
                              >
                                {t(`nav.${grandchild.key}`)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            pathname === child.href ? 'bg-mist-50 text-brand-600' : 'text-ink-700 hover:bg-mist-50 hover:text-brand-600'
                          }`}
                        >
                          {t(`nav.${child.key}`)}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              );
            }

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
              {navLinks.map((link) => {
                if (link.children) {
                  const childActive = link.children.some(
                    (child) => child.href === pathname || child.children?.some((c) => c.href === pathname)
                  );
                  const submenuOpen = openMobileKey === link.key;
                  return (
                    <div key={link.key}>
                      <div
                        className={`flex items-center justify-between rounded-lg text-sm font-medium transition-colors ${
                          childActive ? 'bg-white/10 text-cyan-300' : 'text-slate-200'
                        }`}
                      >
                        <Link href={link.href} className="flex-1 px-3 py-3 hover:text-white">
                          {t(`nav.${link.key}`)}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={submenuOpen}
                          aria-label={t(`nav.${link.key}`)}
                          className="px-3 py-3"
                          onClick={() => {
                            setOpenMobileKey((k) => (k === link.key ? null : link.key));
                            setOpenMobileSubKey(null);
                          }}
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${submenuOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                      {submenuOpen && (
                        <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
                          {link.children.map((child) => {
                            if (child.children) {
                              const subOpen = openMobileSubKey === child.key;
                              const grandchildActive = child.children.some((c) => c.href === pathname);
                              return (
                                <div key={child.href}>
                                  <div
                                    className={`flex items-center justify-between rounded-lg text-sm font-medium transition-colors ${
                                      grandchildActive ? 'text-cyan-300' : 'text-slate-300'
                                    }`}
                                  >
                                    <Link href={child.href} className="flex-1 px-3 py-2.5 hover:text-white">
                                      {t(`nav.${child.key}`)}
                                    </Link>
                                    <button
                                      type="button"
                                      aria-expanded={subOpen}
                                      aria-label={t(`nav.${child.key}`)}
                                      className="px-3 py-2.5"
                                      onClick={() => setOpenMobileSubKey((k) => (k === child.key ? null : child.key))}
                                    >
                                      <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${subOpen ? 'rotate-180' : ''}`}
                                      />
                                    </button>
                                  </div>
                                  {subOpen && (
                                    <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
                                      {child.children.map((grandchild) => (
                                        <Link
                                          key={grandchild.href}
                                          href={grandchild.href}
                                          className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                            pathname === grandchild.href
                                              ? 'text-cyan-300'
                                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                          }`}
                                        >
                                          {t(`nav.${grandchild.key}`)}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            }

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                  pathname === child.href
                                    ? 'text-cyan-300'
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                {t(`nav.${child.key}`)}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
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
                );
              })}
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
