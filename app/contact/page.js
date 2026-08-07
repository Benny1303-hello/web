import { Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/content';

export const metadata = {
  title: 'Liên hệ',
  description: 'Liên hệ TTC-Infotech để được tư vấn giải pháp công nghệ thông tin cho doanh nghiệp.',
};

const cards = [
  { icon: MapPin, title: 'Địa chỉ', value: site.address, href: site.mapHref },
  { icon: Phone, title: 'Điện thoại', value: site.phone, href: site.phoneHref },
  { icon: Mail, title: 'Email', value: site.email, href: `mailto:${site.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Liên hệ"
        eyebrow="Kết nối với chúng tôi"
        title="Hãy để TTC-Infotech đồng hành cùng hệ thống của bạn"
        description="Gửi yêu cầu hoặc liên hệ trực tiếp — đội ngũ của chúng tôi luôn sẵn sàng phản hồi nhanh chóng."
      />

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <a
                  href={card.href}
                  target={card.title === 'Địa chỉ' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex h-full flex-col items-start gap-3 rounded-2xl bg-mist-50 p-6 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
                    <card.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{card.title}</p>
                    <p className="mt-1 text-sm text-ink-400">{card.value}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <ContactForm />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full min-h-[320px] overflow-hidden rounded-2xl shadow-card ring-1 ring-black/5">
                <iframe
                  title="TTC-Infotech location"
                  className="h-full min-h-[320px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=58%20Mac%20Dinh%20Chi%20Street%2C%20District%201%2C%20Ho%20Chi%20Minh%20City&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
