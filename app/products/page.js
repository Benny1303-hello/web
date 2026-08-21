import ProductsContent from './ProductsContent';
import vi from '@/locales/vi.json';

export const metadata = {
  title: vi.pages.products.hero.crumb,
  description: 'Danh mục sản phẩm TTC-Infotech phân phối: UPS, tủ rack, hạ tầng mạng, giám sát an ninh và nhiều thiết bị chính hãng khác.',
};

export default function ProductsPage() {
  return <ProductsContent />;
}
