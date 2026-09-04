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

// Only the fields ProductGroupContent actually renders — leaves each
// product's much larger specGroups/overview/warranty/compatible_with out of
// this page's client bundle entirely.
function toCardProduct(p) {
  return { group: p.group, slug: p.slug, part_number: p.part_number, name: p.name, category_label: p.category_label, images: p.images };
}

export default async function ProductGroupPage({ params }) {
  const { group: groupKey } = await params;
  const group = findGroup(groupKey);
  if (!group) notFound();
  const products = productsCatalog.products.filter((p) => p.group === groupKey).map(toCardProduct);

  return <ProductGroupContent group={group} products={products} />;
}
