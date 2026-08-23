import { notFound } from 'next/navigation';
import ServiceOfferingDetailContent from '../ServiceOfferingDetailContent';
import { serviceOfferings } from '@/lib/content';
import vi from '@/locales/vi.json';

function findOffering(slug) {
  return serviceOfferings.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return serviceOfferings.map((offering) => ({ slug: offering.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const offering = findOffering(slug);
  if (!offering) return {};
  const detail = vi.pages.serviceOfferingDetail[offering.key];
  if (!detail) return {};
  return {
    title: detail.hero.crumb,
    description: detail.solutionDesc,
  };
}

export default async function ServiceOfferingDetailPage({ params }) {
  const { slug } = await params;
  const offering = findOffering(slug);
  if (!offering) notFound();

  return <ServiceOfferingDetailContent offeringKey={offering.key} />;
}
