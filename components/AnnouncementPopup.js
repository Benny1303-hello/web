'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Facebook, Megaphone, X } from 'lucide-react';
import { announcement } from '@/lib/announcement';
import { useLanguage } from '@/context/LanguageContext';

const STORAGE_KEY = 'ttc-announcement-seen';
// A short pause so the popup doesn't land on top of the page before the
// visitor has seen what they navigated to.
const OPEN_DELAY_MS = 1200;

function isLive(item, now) {
  if (!item) return false;
  return now >= new Date(item.startsAt).getTime() && now < new Date(item.endsAt).getTime();
}

export default function AnnouncementPopup() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);

  // Decided on the client only: the server can't know the visitor's
  // dismissal, and the static HTML is built once, long before the window
  // opens or closes.
  useEffect(() => {
    if (!isLive(announcement, Date.now())) return undefined;
    // localStorage throws when site data is blocked; the popup then simply
    // shows on each page load instead of once.
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === announcement.id) return undefined;
    } catch {}
    const id = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, announcement.id);
    } catch {}
  };

  useEffect(() => {
    if (!open) return undefined;
    closeButtonRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (!announcement) return null;

  const content = announcement.content[language] ?? announcement.content.vi;
  const lines = Array.isArray(content.lines) ? content.lines : [];
  const showImage = announcement.image && announcement.image.language === language;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="announcement"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-card"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label={t('announcementPopup.close')}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-navy-950/60 text-white transition-colors hover:bg-navy-950/80"
            >
              <X size={18} />
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {showImage ? (
                <>
                  <h2 id="announcement-title" className="sr-only">
                    {content.title}
                  </h2>
                  <Image
                    src={announcement.image.src}
                    alt={[content.title, ...lines].join(' ')}
                    width={announcement.image.width}
                    height={announcement.image.height}
                    sizes="(min-width: 480px) 448px, 100vw"
                    // Only mounted once the popup opens, so load it right away
                    // rather than waiting on next/image's lazy loading.
                    loading="eager"
                    className="h-auto w-full"
                  />
                </>
              ) : (
                <div className="p-7 pt-8">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
                    <Megaphone size={14} />
                    {t('announcementPopup.label')}
                  </p>
                  <h2 id="announcement-title" className="mt-3 pr-8 font-display text-xl font-bold text-navy-900">
                    {content.title}
                  </h2>
                  <div className="mt-4 space-y-2.5">
                    {lines.map((line) => (
                      <p key={line} className="text-sm leading-relaxed text-ink-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-center justify-end gap-3 border-t border-black/5 bg-white px-5 py-3.5">
              <button
                type="button"
                onClick={close}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink-600 transition-colors hover:bg-mist-50"
              >
                {t('announcementPopup.close')}
              </button>
              {announcement.facebookUrl && (
                <a
                  href={announcement.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-navy-950 transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <Facebook size={16} />
                  {t('announcementPopup.viewOnFacebook')}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
