import ContactContent from './ContactContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.contact.hero.crumb,
  description: 'Liên hệ TTC-Infotech để được tư vấn giải pháp công nghệ thông tin cho doanh nghiệp.',
};

export default function ContactPage() {
  return <ContactContent />;
}
