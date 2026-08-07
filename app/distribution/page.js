import {
  BatteryCharging,
  Cpu,
  Network,
  ServerCog,
  ShieldAlert,
  Wrench,
  Phone,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { productCategories, salesContacts } from '@/lib/content';

export const metadata = {
  title: 'Trung tâm phân phối',
  description: 'TTC-Infotech phân phối thiết bị UPS, tủ rack, hạ tầng mạng và giải pháp giám sát từ các hãng công nghệ hàng đầu.',
};

const icons = [BatteryCharging, ServerCog, Network, ShieldAlert, Cpu, Wrench];

export default function DistributionPage() {
  return (
    <>
      <PageHero
        crumb="Trung tâm phân phối"
        eyebrow="Distribution Center"
        title="Nhà phân phối công nghệ hàng đầu cho hạ tầng doanh nghiệp"
        description="Là mắt xích quan trọng trong chuỗi cung ứng IT, chúng tôi mang đến giải pháp tối ưu cho từng đối tác kênh phân phối."
      />

      <section className="bg-white py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Danh mục sản phẩm</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              Thiết bị chính hãng từ các thương hiệu công nghệ toàn cầu
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((cat, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={cat.title} delay={(i % 3) * 0.08}>
                  <div className="group h-full rounded-2xl border border-black/5 bg-mist-50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-navy-950 hover:shadow-card">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-white">
                      {cat.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400 transition-colors group-hover:text-slate-300">
                      {cat.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Liên hệ đặt hàng</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              Đội ngũ kinh doanh sẵn sàng hỗ trợ báo giá
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {salesContacts.map((contact, i) => (
              <Reveal key={contact.name} delay={i * 0.06}>
                <div className="flex items-center justify-between rounded-xl bg-white px-6 py-5 shadow-soft ring-1 ring-black/5">
                  <span className="font-medium text-ink-900">{contact.name}</span>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                  >
                    <Phone size={14} />
                    {contact.phone}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
