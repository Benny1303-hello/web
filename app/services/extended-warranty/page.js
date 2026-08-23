import ExtendedWarrantyContent from './ExtendedWarrantyContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.extendedWarranty.hero.crumb,
  description: vi.pages.extendedWarranty.solutionDesc,
};

export default function ExtendedWarrantyPage() {
  return <ExtendedWarrantyContent />;
}
