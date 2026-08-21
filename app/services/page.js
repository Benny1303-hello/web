import ServicesContent from './ServicesContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.services.hero.crumb,
  description: 'Dịch vụ kỹ thuật IT: sửa chữa phần cứng, xử lý sự cố mạng, bảo trì máy chủ, sao lưu và hỗ trợ từ xa.',
};

export default function ServicesPage() {
  return <ServicesContent />;
}
