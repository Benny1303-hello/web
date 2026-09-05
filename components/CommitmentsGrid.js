'use client';

import { CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function CommitmentsGrid({ commitments }) {
  if (!Array.isArray(commitments)) return null;

  return (
    <div className="mt-12 flex flex-wrap justify-center gap-6">
      {commitments.map((commitment, i) => (
        <Reveal
          key={commitment.title}
          delay={i * 0.08}
          className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
        >
          <div className="h-full rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5">
            <h3 className="font-display text-base font-bold text-ink-900">{commitment.title}</h3>
            <ul className="mt-3 space-y-2">
              {Array.isArray(commitment.items) && commitment.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-ink-400">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
