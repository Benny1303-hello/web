import { ShieldCheck, ThumbsUp, Zap } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import { stats, trustBadges } from '@/lib/content';

const icons = [Zap, ShieldCheck, ThumbsUp];

export default function TrustStats() {
  return (
    <section className="relative bg-mist-50">
      <div className="container-page -mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
        {trustBadges.map((badge, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={badge.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-ink-900">{badge.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{badge.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="container-page grid grid-cols-1 gap-8 py-20 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1} className="text-center">
            <div className="font-display text-4xl font-extrabold text-navy-900 md:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-ink-400">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
