import { Inter, Sora } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { LanguageProvider } from '@/context/LanguageContext';
import { site } from '@/lib/content';

// Set NEXT_PUBLIC_GA_ID (a GA4 measurement id, e.g. G-XXXXXXXXXX) in Vercel to
// turn analytics on. Left unset — in local dev, preview builds, or before the
// property exists — nothing is injected and no request is made to Google.
const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    'TTC-Infotech - Đối tác công nghệ thông tin: phân phối thiết bị, tích hợp hệ thống và dịch vụ kỹ thuật cho doanh nghiệp trên 25 năm.',
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
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
