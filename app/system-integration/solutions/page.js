import SolutionsContent from './SolutionsContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.systemIntegrationSolutions.hero.crumb,
  description: 'Giải pháp IT cho doanh nghiệp vừa và nhỏ, Firewall & cân bằng tải, điều khiển tập trung — tối ưu chi phí đầu tư và vận hành hệ thống.',
};

export default function SystemIntegrationSolutionsPage() {
  return <SolutionsContent />;
}
