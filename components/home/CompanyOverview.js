import { CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';

const points = [
  'Đội ngũ kỹ sư giàu kinh nghiệm, chứng chỉ quốc tế',
  'Liên minh chiến lược với các hãng công nghệ hàng đầu',
  'Hỗ trợ kỹ thuật và giám sát chủ động 24/7',
];

export default function CompanyOverview() {
  return (
    <section className="bg-mist-50 py-20">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/15 to-cyan-400/15 blur-2xl" />
            <div className="rounded-3xl bg-white p-8 shadow-card ring-1 ring-black/5">
              <div className="grid grid-cols-2 gap-4">
                {['Tư vấn', 'Phân phối', 'Tích hợp', 'Vận hành'].map((label, i) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-mist-50 py-8 text-center ring-1 ring-black/5"
                  >
                    <span className="font-display text-2xl font-bold text-brand-600">0{i + 1}</span>
                    <span className="text-sm font-medium text-ink-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Tổng quan công ty</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Vận hành hệ thống IT không còn là gánh nặng của riêng bạn
          </h2>
          <p className="mt-5 text-balance leading-relaxed text-ink-400">
            Tự xây dựng và vận hành phòng IT nội bộ vừa tốn thời gian vừa tốn kém. TTC-Infotech đồng hành
            cùng doanh nghiệp gánh vác trách nhiệm đó — một giải pháp phổ biến và hiệu quả, đặc biệt với
            các doanh nghiệp vừa và nhỏ.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-ink-600">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-500" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/about" variant="dark">
              Tìm hiểu thêm
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
