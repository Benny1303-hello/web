import {
  HardDrive,
  Network,
  ServerCrash,
  DatabaseBackup,
  MonitorSmartphone,
  Headset,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'Trung tâm dịch vụ',
  description: 'Dịch vụ kỹ thuật IT: sửa chữa phần cứng, xử lý sự cố mạng, bảo trì máy chủ, sao lưu và hỗ trợ từ xa.',
};

const services = [
  { icon: HardDrive, title: 'Sửa chữa phần cứng', desc: 'Chẩn đoán và khắc phục sự cố máy tính, máy chủ với chi phí tối ưu nhất.' },
  { icon: Network, title: 'Xử lý sự cố mạng', desc: 'Khắc phục sự cố kết nối, tối ưu hiệu năng hệ thống mạng doanh nghiệp.' },
  { icon: ServerCrash, title: 'Bảo trì máy chủ', desc: 'Kiểm tra định kỳ, phòng ngừa sự cố và duy trì hoạt động ổn định cho server.' },
  { icon: DatabaseBackup, title: 'Sao lưu & phục hồi dữ liệu', desc: 'Xây dựng phương án backup và khôi phục dữ liệu an toàn, đáng tin cậy.' },
  { icon: MonitorSmartphone, title: 'Hỗ trợ từ xa', desc: 'Đăng nhập từ xa để xử lý ngay nhiều sự cố mà không cần chờ kỹ thuật viên di chuyển.' },
  { icon: Headset, title: 'Hỗ trợ tại chỗ', desc: 'Kỹ thuật viên có mặt trực tiếp khi sự cố cần xử lý tại văn phòng khách hàng.' },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Trung tâm dịch vụ"
        eyebrow="Service Center"
        title="Đội ngũ kỹ thuật viên sẵn sàng xử lý mọi sự cố IT"
        description="Đội ngũ kỹ thuật viên máy tính giàu kinh nghiệm của chúng tôi sẽ đánh giá vấn đề và tìm giải pháp nhanh chóng, với chi phí tối ưu nhất là ưu tiên hàng đầu."
      />

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl border border-black/5 bg-mist-50 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-navy-950 hover:shadow-card">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-110">
                    <service.icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400 transition-colors group-hover:text-slate-300">
                    {service.desc}
                  </p>
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
