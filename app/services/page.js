import ServicesContent from './ServicesContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.services.hero.crumb,
  description: 'Trung tâm dịch vụ TTC-Infotech: bảo hành, bảo trì, sửa chữa và hỗ trợ kỹ thuật 24/7, đối tác dịch vụ ủy quyền của Schneider (APC).',
};

export default function ServicesPage() {
  return <ServicesContent />;
}
