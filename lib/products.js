// Shared by every products page.js (index, group, detail) so a future change
// to how a product or group is looked up only has to happen in one place.
import productsCatalog from '@/lib/productsCatalog.json';

export function findProduct(groupKey, slug) {
  return productsCatalog.products.find((p) => p.group === groupKey && p.slug === slug);
}

export function findGroup(key) {
  return productsCatalog.groups.find((g) => g.key === key);
}
