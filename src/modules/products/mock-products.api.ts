import type { ProductFiltersState, ProductListItem, ProductQueryOptions, ProductQueryResult } from './types';

const brands = ['Shell', 'Mobil', 'Castrol', 'Valvoline'];
const productTypes = ['Engine oil', 'Hydraulic oil', 'Gear oil'];
const categories = ['Industrial', 'Automotive', 'Heavy duty'];

const createMockProducts = () => {
  const items: ProductListItem[] = [];

  for (let index = 1; index <= 72; index += 1) {
    const brand = brands[index % brands.length]!;
    const productType = productTypes[index % productTypes.length]!;
    const category = categories[index % categories.length]!;
    const isActive = index % 5 !== 0;

    items.push({
      id: `prod-${index}`,
      name: `${brand} ${productType} ${index}`,
      brand,
      productType,
      category,
      image: `https://picsum.photos/seed/lubricant-${index}/640/480`,
      isActive,
      variantCount: (index % 6) + 1,
      priceMin: 45 + index,
      priceMax: 75 + index * 2,
      createdAt: new Date(Date.now() - index * 86_400_000).toISOString(),
    });
  }

  return items;
};

const mockProducts = createMockProducts();

const matchesFilters = (item: ProductListItem, filters: ProductFiltersState) => {
  const status = item.isActive ? 'active' : 'inactive';

  return (
    (filters.brand === 'all' || item.brand === filters.brand)
    && (filters.productType === 'all' || item.productType === filters.productType)
    && (filters.category === 'all' || item.category === filters.category)
    && (filters.status === 'all' || status === filters.status)
  );
};

export const getProductFilterOptions = () => {
  return {
    brands,
    productTypes,
    categories,
  };
};

export const fetchMockProducts = async (options: ProductQueryOptions): Promise<ProductQueryResult> => {
  await new Promise(resolve => setTimeout(resolve, 700));

  if (options.search.trim().toLowerCase() === 'error') {
    throw new Error('Failed to load products');
  }

  const normalizedSearch = options.search.trim().toLowerCase();

  const filtered = mockProducts.filter((item) => {
    if (!matchesFilters(item, options.filters)) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    return (
      item.name.toLowerCase().includes(normalizedSearch)
      || item.brand.toLowerCase().includes(normalizedSearch)
      || item.category.toLowerCase().includes(normalizedSearch)
      || item.productType.toLowerCase().includes(normalizedSearch)
    );
  });

  const start = (options.page - 1) * options.pageSize;
  const end = start + options.pageSize;

  return {
    items: filtered.slice(start, end),
    total: filtered.length,
    page: options.page,
    pageSize: options.pageSize,
  };
};
