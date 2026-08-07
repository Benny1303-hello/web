import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'TTC-Infotech | Your IT Partner',
    template: '%s | TTC-Infotech',
  },
  description:
    'TTC-Infotech - Đối tác công nghệ thông tin: phân phối thiết bị, tích hợp hệ thống và dịch vụ kỹ thuật cho doanh nghiệp trên 20 năm.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
