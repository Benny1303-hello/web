import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { LanguageProvider } from '@/context/LanguageContext';
import { site } from '@/lib/content';

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

const siteDescription =
  'TTC-Infotech - Đối tác công nghệ thông tin: phân phối thiết bị, tích hợp hệ thống và dịch vụ kỹ thuật cho doanh nghiệp trên 25 năm.';

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: siteDescription,
  // Without these, a link shared to Facebook/Zalo/LinkedIn gets whatever the
  // platform scrapes rather than a controlled title and summary. Per-page
  // titles and descriptions flow through automatically; no image is set yet
  // because the site has no 1200x630 asset and the portrait hero photos crop
  // badly in a share card.
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: siteDescription,
    url: site.url,
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary',
    title: `${site.name} | ${site.tagline}`,
    description: siteDescription,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <LanguageProvider>
          <Navbar />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
