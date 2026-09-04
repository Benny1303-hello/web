'use client';

import { Search } from 'lucide-react';

export default function ProductSearchInput({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-300" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-black/10 bg-mist-50 py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
    </div>
  );
}
