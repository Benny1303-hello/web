import ProductsContent from './ProductsContent';
import vi from '@/locales/vi.json';
import productsCatalog from '@/lib/productsCatalog.json';

export const metadata = {
  title: vi.pages.products.hero.crumb,
  description: 'Danh mục sản phẩm TTC-Infotech phân phối: UPS, tủ rack, hạ tầng mạng, giám sát an ninh và nhiều thiết bị chính hãng khác.',
};

export default function ProductsPage() {
  // Only the fields the search box and group-count tiles actually render —
  // leaves every product's much larger specGroups/overview/images out of
  // this page's client bundle.
  const searchIndex = productsCatalog.products.map((p) => ({
    group: p.group,
    slug: p.slug,
    part_number: p.part_number,
    name: p.name,
  }));
  const countByGroup = {};
  for (const p of searchIndex) {
    countByGroup[p.group] = (countByGroup[p.group] || 0) + 1;
  }

  return <ProductsContent groups={productsCatalog.groups} searchIndex={searchIndex} countByGroup={countByGroup} />;
}
