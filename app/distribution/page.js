import DistributionContent from './DistributionContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.distribution.hero.crumb,
  description: 'TTC-Infotech phân phối thiết bị UPS, tủ rack, hạ tầng mạng và giải pháp giám sát từ các hãng công nghệ hàng đầu.',
};

export default function DistributionPage() {
  return <DistributionContent />;
}
