import { notFound } from 'next/navigation';
import ProductDetailContent from './ProductDetailContent';
import productsCatalog from '@/lib/productsCatalog.json';

// Falls back to the current known production URL; override with
// NEXT_PUBLIC_SITE_URL once a custom domain is pointed at this deployment,
// no code change needed.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-vxfh.vercel.app';

function findProduct(groupKey, slug) {
  return productsCatalog.products.find((p) => p.group === groupKey && p.slug === slug);
}

function buildProductJsonLd(product, groupKey, slug) {
  // No `offers`/price: this is a B2B contact-for-quote catalog with no public
  // pricing anywhere on the site, so declaring one would be fabricated data.
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    sku: product.part_number,
    description: product.overview || product.name,
    category: product.category_label,
    brand: { '@type': 'Brand', name: 'APC' },
    url: `${SITE_URL}/products/${groupKey}/${slug}`,
    ...(Array.isArray(product.images) && product.images.length > 0
      ? { image: product.images.map((src) => `${SITE_URL}${src}`) }
      : {}),
  };
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
  const group = productsCatalog.groups.find((g) => g.key === groupKey);

  const jsonLd = buildProductJsonLd(product, groupKey, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ProductDetailContent product={product} group={group} />
    </>
  );
}
