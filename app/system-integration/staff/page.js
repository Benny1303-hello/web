import StaffContent from './StaffContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.systemIntegrationStaff.hero.crumb,
  description: 'Đội ngũ kỹ sư tích hợp hệ thống của TTC-Infotech, sẵn sàng tư vấn thiết kế và triển khai giải pháp hạ tầng công nghệ.',
};

export default function SystemIntegrationStaffPage() {
  return <StaffContent />;
}
