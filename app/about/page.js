import AboutContent from './AboutContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.about.hero.crumb,
  description: 'TTC-Infotech thành lập năm 1994, hơn 20 năm xây dựng liên minh chiến lược với các hãng IT hàng đầu.',
};

export default function AboutPage() {
  return <AboutContent />;
}
