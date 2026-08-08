import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { partners } from '@/lib/content';

export default function PartnersMarquee() {
  const loop = [...partners, ...partners];

  return (
    <section className="bg-mist-50 py-16">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Đối tác chiến lược</p>
        </Reveal>
      </div>

      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {loop.map((partner, i) =>
            partner.logo ? (
              <span
                key={`${partner.name}-${i}`}
                className="flex h-16 w-40 items-center justify-center whitespace-nowrap rounded-2xl bg-white px-6 py-3 shadow-soft ring-1 ring-black/5"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </span>
            ) : (
              <span
                key={`${partner.name}-${i}`}
                className="flex h-16 items-center whitespace-nowrap rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-ink-600 shadow-soft ring-1 ring-black/5"
              >
                {partner.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
