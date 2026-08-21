import StaffContent from './StaffContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.staff.hero.crumb,
  description: 'Đội ngũ kinh doanh và tư vấn giải pháp của TTC-Infotech, sẵn sàng hỗ trợ báo giá và tư vấn kênh phân phối.',
};

export default function StaffPage() {
  return <StaffContent />;
}
