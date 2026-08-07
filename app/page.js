import Hero from '@/components/home/Hero';
import TrustStats from '@/components/home/TrustStats';
import CompanyOverview from '@/components/home/CompanyOverview';
import CentersGrid from '@/components/home/CentersGrid';
import Testimonials from '@/components/home/Testimonials';
import PartnersMarquee from '@/components/home/PartnersMarquee';
import CtaBanner from '@/components/CtaBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStats />
      <CompanyOverview />
      <CentersGrid />
      <Testimonials />
      <PartnersMarquee />
      <CtaBanner />
    </>
  );
}
