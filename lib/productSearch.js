// Shared by the products index page and each group page's search box, so a
// future change to what counts as a match (e.g. adding category_label) only
// has to happen in one place.
export function matchesProductQuery(product, lowerCaseQuery) {
  return (
    (product.part_number ?? '').toLowerCase().includes(lowerCaseQuery) ||
    (product.name ?? '').toLowerCase().includes(lowerCaseQuery)
  );
}
