import { notFound } from 'next/navigation';
import ProductDetailContent from './ProductDetailContent';
import productsCatalog from '@/lib/productsCatalog.json';
import { findProduct, findGroup } from '@/lib/products';
import { site } from '@/lib/content';

const SITE_URL = site.url;

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
    // Falls back to APC (every product today is APC) — reads product.brand
    // so a future non-APC vendor import (HPE, Microsoft, Telegartner) isn't
    // silently mislabeled once that field is populated.
    brand: { '@type': 'Brand', name: product.brand || 'APC' },
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

  const title = `${product.name} (${product.part_number})`;
  const description = product.overview || product.name;
  const images = Array.isArray(product.images) && product.images.length > 0 ? [product.images[0]] : undefined;

  // openGraph is set explicitly because the root layout defines its own, and an
  // inherited openGraph.title wins over this page's `title` — without this,
  // every shared product link would preview as the generic site title.
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${SITE_URL}/products/${groupKey}/${slug}`,
      images,
    },
    twitter: { card: images ? 'summary_large_image' : 'summary', title, description, images },
  };
}

export default async function ProductDetailPage({ params }) {
  const { group: groupKey, slug } = await params;
  const product = findProduct(groupKey, slug);
  if (!product) notFound();
  const group = findGroup(groupKey);
  if (!group) notFound();

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
