import { notFound } from 'next/navigation';
import ProductsContent from '../../ProductsContent';
import productsCatalog from '@/lib/productsCatalog.json';
import { productBrands } from '@/lib/content';

export function generateStaticParams() {
  return productBrands.map((b) => ({ brand: b.key }));
}

export async function generateMetadata({ params }) {
  const { brand: brandKey } = await params;
  const brand = productBrands.find((b) => b.key === brandKey);
  if (!brand) return {};
  return { title: brand.name };
}

export default async function ProductBrandPage({ params }) {
  const { brand: brandKey } = await params;
  const brand = productBrands.find((b) => b.key === brandKey);
  if (!brand) notFound();

  const groups = productsCatalog.groups.filter((g) => brand.groups.includes(g.key));
  const searchIndex = productsCatalog.products
    .filter((p) => brand.groups.includes(p.group))
    .map((p) => ({ group: p.group, slug: p.slug, part_number: p.part_number, name: p.name }));
  const countByGroup = {};
  for (const p of searchIndex) {
    countByGroup[p.group] = (countByGroup[p.group] || 0) + 1;
  }

  return (
    <ProductsContent
      groups={groups}
      searchIndex={searchIndex}
      countByGroup={countByGroup}
      brand={{ key: brand.key, name: brand.name }}
    />
  );
}
