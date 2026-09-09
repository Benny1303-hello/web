import PromotionsContent from './PromotionsContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.promotions.hero.crumb,
  description: vi.pages.promotions.hero.description,
};

export default function PromotionsPage() {
  return <PromotionsContent />;
}
