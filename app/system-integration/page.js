import SystemIntegrationContent from './SystemIntegrationContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.systemIntegration.hero.crumb,
  description: 'Giải pháp tích hợp hệ thống IT giúp doanh nghiệp tối ưu hạ tầng, tái sử dụng thiết bị cũ và tiết kiệm chi phí.',
};

export default function SystemIntegrationPage() {
  return <SystemIntegrationContent />;
}
