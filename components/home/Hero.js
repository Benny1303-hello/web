'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { site } from '@/lib/content';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-mesh text-white">
      <div className="container-page relative flex flex-col items-center gap-14 py-24 lg:flex-row lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 text-center lg:text-left"
        >
          <span className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            {site.tagline}
          </span>
          <h1 className="mt-6 text-balance font-display text-5xl font-extrabold leading-[1.08] md:text-6xl">
            <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              TTC-INFOTECH
            </span>
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-400">
            System Integration · Distribution Center · Services Center
          </p>
          <p className="mx-auto mt-6 max-w-lg text-balance text-slate-300 lg:mx-0">
            Hơn 20 năm đồng hành cùng doanh nghiệp Việt Nam xây dựng hạ tầng công nghệ vững chắc — từ tư
            vấn, phân phối thiết bị, tích hợp hệ thống đến vận hành và bảo trì.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button href="/contact" variant="primary">
              Yêu cầu tư vấn
            </Button>
            <Button href="/about" variant="outline" withArrow={false}>
              Tìm hiểu thêm
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-1"
        >
          <HeroArt />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-mist-50" />
    </section>
  );
}

function HeroArt() {
  return (
    <svg
      viewBox="0 0 460 380"
      className="mx-auto w-full max-w-md animate-floaty drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rackBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#173F70" />
          <stop offset="100%" stopColor="#0B1B33" />
        </linearGradient>
        <linearGradient id="nodeGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7EE8F0" />
          <stop offset="100%" stopColor="#2E7BEF" />
        </linearGradient>
      </defs>

      <g stroke="#2E5C9E" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.6">
        <line x1="150" y1="90" x2="90" y2="40" />
        <line x1="150" y1="90" x2="230" y2="30" />
        <line x1="150" y1="90" x2="320" y2="70" />
        <line x1="150" y1="220" x2="70" y2="180" />
        <line x1="150" y1="220" x2="340" y2="200" />
        <line x1="150" y1="220" x2="250" y2="290" />
      </g>

      <circle cx="90" cy="40" r="7" fill="url(#nodeGlow)" />
      <circle cx="230" cy="30" r="6" fill="#34D4E0" />
      <circle cx="320" cy="70" r="8" fill="url(#nodeGlow)" />
      <circle cx="70" cy="180" r="6" fill="#34D4E0" />
      <circle cx="340" cy="200" r="7" fill="url(#nodeGlow)" />
      <circle cx="250" cy="290" r="6" fill="#34D4E0" />

      <rect x="110" y="60" width="220" height="260" rx="18" fill="url(#rackBody)" stroke="#2E7BEF" strokeWidth="1.5" />

      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="128" y={82 + i * 46} width="184" height="32" rx="6" fill="#0F2748" stroke="#204A82" />
          <circle cx="144" cy={98 + i * 46} r="4" fill={i % 2 === 0 ? '#34D4E0' : '#F5A524'} />
          <rect x="160" y={94 + i * 46} width="110" height="8" rx="4" fill="#1D3E6C" />
          <rect x="280" y={94 + i * 46} width="16" height="8" rx="2" fill="#2E7BEF" />
        </g>
      ))}
    </svg>
  );
}
