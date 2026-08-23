import ApcGoldWarrantyContent from './ApcGoldWarrantyContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.apcGoldWarranty.hero.crumb,
  description: vi.pages.apcGoldWarranty.intro,
};

export default function ApcGoldWarrantyPage() {
  return <ApcGoldWarrantyContent />;
}
