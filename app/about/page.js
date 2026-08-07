import { Award, Compass, Heart, Users2, Zap, ShieldCheck, ThumbsUp } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';
import { whyChooseUs } from '@/lib/content';

export const metadata = {
  title: 'Về chúng tôi',
  description: 'TTC-Infotech thành lập năm 1994, hơn 20 năm xây dựng liên minh chiến lược với các hãng IT hàng đầu.',
};

const pillars = [
  {
    icon: Compass,
    title: 'Sứ mệnh',
    desc: 'Mang đến nền tảng vận hành số cho doanh nghiệp, đồng hành cùng Việt Nam trên hành trình trở thành nền kinh tế dựa trên khoa học công nghệ.',
  },
  {
    icon: Heart,
    title: 'Khát vọng',
    desc: 'Luôn đặt lợi ích khách hàng lên hàng đầu, với khát khao giúp doanh nghiệp vận hành hiệu quả và nhanh chóng hơn mỗi ngày.',
  },
  {
    icon: Users2,
    title: 'Con người',
    desc: 'Đội ngũ làm việc bằng đam mê, yêu công nghệ và không ngừng đổi mới trong từng dự án, luôn nêu cao tinh thần dẫn dắt.',
  },
];

const icons = [Zap, ShieldCheck, ThumbsUp];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="Về chúng tôi"
        eyebrow="TTC-Infotech"
        title="Hơn 20 năm kiến tạo nền tảng công nghệ cho doanh nghiệp Việt"
        description="Thành lập năm 1994, TTC-Infotech là một trong những công ty công nghệ thông tin hàng đầu tại Việt Nam."
      />

      <section className="bg-white py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Câu chuyện của chúng tôi</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              Liên minh chiến lược với các hãng công nghệ hàng đầu thế giới
            </h2>
            <p className="mt-5 leading-relaxed text-ink-400">
              Trải qua hơn 20 năm, TTC-Infotech đã xây dựng những mối quan hệ hợp tác chiến lược với các
              hãng tích hợp hệ thống IT hàng đầu thế giới, giúp chúng tôi mang đến cho khách hàng những hệ
              thống hiện đại nhất, nâng cao năng suất qua đào tạo và dịch vụ hỗ trợ kỹ thuật ổn định.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Công nghệ số</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900">
              Mỗi khách hàng là một đối tác đồng hành
            </h2>
            <p className="mt-5 leading-relaxed text-ink-400">
              Chúng tôi tin rằng mỗi khách hàng là một đối tác, cùng nhau xây dựng dịch vụ IT chất lượng với
              chi phí hợp lý. Đội ngũ chuyên gia thân thiện, giàu kinh nghiệm luôn sẵn sàng chỉ sau một
              cuộc gọi, email hay tin nhắn.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="container-page grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-white p-8 shadow-soft ring-1 ring-black/5">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white">
                  <pillar.icon size={22} />
                </div>
                <h3 className="font-display text-xl font-bold text-ink-900">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{pillar.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 flex items-center justify-center gap-2">
              <Award size={16} /> Vì sao chọn chúng tôi
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold text-navy-900 md:text-4xl">
              Cam kết chất lượng ở mọi giai đoạn hợp tác
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {whyChooseUs.map((item, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="h-full rounded-2xl border border-black/5 bg-mist-50 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-cyan-300">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
