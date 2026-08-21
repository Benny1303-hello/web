import ListContent from './ListContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.servicesList.hero.crumb,
  description: 'Dịch vụ kỹ thuật IT: bảo trì hệ thống mạng, sửa chữa, lắp đặt, bảo hành mở rộng, di dời hệ thống và tư vấn thiết kế.',
};

export default function ServicesListPage() {
  return <ListContent />;
}
