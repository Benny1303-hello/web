import DistributionContent from './DistributionContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.distribution.hero.crumb,
  description: 'TTC-Infotech là trung tâm phân phối công nghệ end-to-end tại Việt Nam, đại diện phân phối APC by Schneider Electric, HPE Aruba Networking, Microsoft và Telegartner.',
};

export default function DistributionPage() {
  return <DistributionContent />;
}
