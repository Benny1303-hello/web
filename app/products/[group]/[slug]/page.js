import { notFound } from 'next/navigation';
import ProductDetailContent from './ProductDetailContent';
import productsCatalog from '@/lib/productsCatalog.json';

function findProduct(groupKey, slug) {
  return productsCatalog.products.find((p) => p.group === groupKey && p.slug === slug);
}

export function generateStaticParams() {
  return productsCatalog.products.map((p) => ({ group: p.group, slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { group: groupKey, slug } = await params;
  const product = findProduct(groupKey, slug);
  if (!product) return {};
  return {
    title: `${product.name} (${product.part_number})`,
    description: product.overview || product.name,
  };
}

export default async function ProductDetailPage({ params }) {
  const { group: groupKey, slug } = await params;
  const product = findProduct(groupKey, slug);
  if (!product) notFound();

  return <ProductDetailContent groupKey={groupKey} slug={slug} />;
}
