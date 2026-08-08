'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { navLinks, site } from '@/lib/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-cyan-300"
              >
                {link.label}
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

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-white"
            aria-label={site.phone}
          >
            <Phone size={16} className="text-cyan-300" />
            <span className="hidden xl:inline">{site.phone}</span>
          </a>

          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-glow transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Yêu cầu tư vấn
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 bg-navy-950 lg:hidden"
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
                  {link.label}
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
                Yêu cầu tư vấn
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
