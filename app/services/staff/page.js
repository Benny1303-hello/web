import StaffContent from './StaffContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.servicesStaff.hero.crumb,
  description: 'Đội ngũ hỗ trợ dịch vụ của TTC-Infotech, sẵn sàng tư vấn bảo trì, sửa chữa và hỗ trợ kỹ thuật 24/7.',
};

export default function ServicesStaffPage() {
  return <StaffContent />;
}
