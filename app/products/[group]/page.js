import { notFound } from 'next/navigation';
import ProductGroupContent from './ProductGroupContent';
import productsCatalog from '@/lib/productsCatalog.json';

function findGroup(key) {
  return productsCatalog.groups.find((g) => g.key === key);
}

export function generateStaticParams() {
  return productsCatalog.groups.map((g) => ({ group: g.key }));
}

export async function generateMetadata({ params }) {
  const { group: groupKey } = await params;
  const group = findGroup(groupKey);
  if (!group) return {};
  return {
    title: group.title,
    description: group.desc,
  };
}

export default async function ProductGroupPage({ params }) {
  const { group: groupKey } = await params;
  const group = findGroup(groupKey);
  if (!group) notFound();

  return <ProductGroupContent groupKey={groupKey} />;
}
