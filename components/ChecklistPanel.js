'use client';

import { CheckCircle2 } from 'lucide-react';

export default function ChecklistPanel({ heading, items }) {
  return (
    <div className="rounded-3xl bg-hero-mesh p-8 text-white">
      <p className="text-xl font-bold uppercase tracking-[0.05em] text-cyan-300">{heading}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan-300" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
