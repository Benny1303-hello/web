import { ClipboardList, Layers, Rocket, LifeBuoy, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'Tích hợp hệ thống',
  description: 'Giải pháp tích hợp hệ thống IT giúp doanh nghiệp tối ưu hạ tầng, tái sử dụng thiết bị cũ và tiết kiệm chi phí.',
};

const process = [
  { icon: ClipboardList, title: 'Khảo sát & tư vấn', desc: 'Đánh giá hiện trạng hạ tầng, thu thập yêu cầu và mục tiêu vận hành của doanh nghiệp.' },
  { icon: Layers, title: 'Thiết kế giải pháp', desc: 'Xây dựng kiến trúc tích hợp tối ưu, kết hợp thiết bị của nhiều hãng khác nhau một cách đồng bộ.' },
  { icon: Rocket, title: 'Triển khai', desc: 'Lắp đặt, cấu hình và kiểm thử toàn diện trước khi đưa hệ thống vào vận hành chính thức.' },
  { icon: LifeBuoy, title: 'Hỗ trợ vận hành', desc: 'Giám sát, bảo trì định kỳ và hỗ trợ kỹ thuật liên tục sau triển khai.' },
];

const benefits = [
  'Tận dụng tối đa hiệu suất hạ tầng hiện có',
  'Tái sử dụng phần mềm và thiết bị cũ, giảm lãng phí đầu tư',
  'Tiết kiệm chi phí vận hành dài hạn',
  'Triển khai đồng thời nhiều giải pháp mới từ các hãng khác nhau',
];

export default function SystemIntegrationPage() {
  return (
    <>
      <PageHero
        crumb="Tích hợp hệ thống"
        eyebrow="System Integration Center"
        title="Kết nối đồng bộ mọi thành phần trong hạ tầng công nghệ của bạn"
        description="Tích hợp hệ thống giúp doanh nghiệp khai thác tối đa hiệu quả hạ tầng, tái sử dụng phần mềm cũ và tiết kiệm chi phí khi triển khai đồng thời nhiều giải pháp từ các nhà sản xuất khác nhau."
      />

      <section className="bg-white py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Vì sao cần tích hợp hệ thống</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              Một hệ thống đồng bộ, vận hành trơn tru
            </h2>
            <p className="mt-5 leading-relaxed text-ink-400">
              Tích hợp hệ thống ngày càng trở nên quan trọng vì giúp doanh nghiệp và tổ chức khai thác hiệu
              quả cao nhất từ hạ tầng sẵn có, tái sử dụng phần mềm cũ, tiết kiệm chi phí và triển khai đồng
              thời các giải pháp mới bằng cách tích hợp sản phẩm từ nhiều nhà sản xuất khác nhau.
            </p>
            <ul className="mt-6 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-ink-600">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-500" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-hero-mesh p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Quy trình triển khai</p>
              <div className="mt-6 space-y-6">
                {process.map((step, i) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                      <step.icon size={18} />
                    </div>
                    <div>
                      <p className="font-display font-bold">
                        {i + 1}. {step.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-300">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
