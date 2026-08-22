import { notFound } from 'next/navigation';
import SolutionDetailContent from '../SolutionDetailContent';
import { systemIntegrationSolutions } from '@/lib/content';
import vi from '@/locales/vi.json';

export function generateStaticParams() {
  return systemIntegrationSolutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const solution = systemIntegrationSolutions.find((item) => item.slug === slug);
  if (!solution) return {};
  const detail = vi.pages.systemIntegrationSolutionDetail[solution.key];
  return {
    title: detail.hero.crumb,
    description: detail.solutionDesc,
  };
}

export default async function SolutionDetailPage({ params }) {
  const { slug } = await params;
  const solution = systemIntegrationSolutions.find((item) => item.slug === slug);
  if (!solution) notFound();

  return <SolutionDetailContent solutionKey={solution.key} />;
}
