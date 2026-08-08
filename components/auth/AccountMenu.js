'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, LogOut, Package, UserCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AccountMenu({ variant = 'desktop' }) {
  const { user, profile, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const name = profile?.username || user?.displayName || user?.email?.split('@')[0] || 'Tài khoản';
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = async () => {
    setOpen(false);
    await logout();
  };

  if (variant === 'mobile') {
    return (
      <div className="mt-2 rounded-lg bg-white/5 p-3">
        <div className="flex items-center gap-3 px-1 pb-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 text-sm font-bold text-navy-950">
            {initial}
          </span>
          <span className="truncate text-sm font-semibold text-white">{name}</span>
        </div>
        <Link href="/account" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-white/5">
          <UserCircle size={16} /> Thông tin tài khoản
        </Link>
        <Link href="/account?tab=orders" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-white/5">
          <Package size={16} /> Đơn hàng của tôi
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-300 hover:bg-white/5"
        >
          <LogOut size={16} /> Đăng xuất
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-1.5 pr-3 text-sm font-medium text-white transition-colors hover:bg-white/15"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 text-xs font-bold text-navy-950">
          {initial}
        </span>
        <span className="max-w-[100px] truncate">{name}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl bg-white py-2 shadow-card ring-1 ring-black/5"
          >
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 transition-colors hover:bg-mist-50"
            >
              <UserCircle size={16} className="text-brand-500" /> Thông tin tài khoản
            </Link>
            <Link
              href="/account?tab=orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 transition-colors hover:bg-mist-50"
            >
              <Package size={16} className="text-brand-500" /> Đơn hàng của tôi
            </Link>
            <div className="my-1 border-t border-black/5" />
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut size={16} /> Đăng xuất
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
