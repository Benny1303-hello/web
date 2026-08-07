import { Network, PackageSearch, Wrench } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { centers } from '@/lib/content';

const icons = { services: Wrench, distribution: PackageSearch, 'system-integration': Network };

export default function CentersGrid() {
  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">TTC-Infotech</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Ba trung tâm, một hệ sinh thái công nghệ trọn vẹn
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {centers.map((center, i) => {
            const Icon = icons[center.slug];
            return (
              <Reveal key={center.slug} delay={i * 0.1}>
                <Link
                  href={`/${center.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-black/5 bg-mist-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:bg-navy-950 hover:shadow-card"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink-900 transition-colors group-hover:text-white">
                    {center.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-400 transition-colors group-hover:text-slate-300">
                    {center.short}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors group-hover:text-cyan-300">
                    Xem thêm
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
