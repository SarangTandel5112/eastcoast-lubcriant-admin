import type { ProductListFilters } from './types/product.types';

export const productKeys = {
  all: ['products'] as const,
  filterMeta: () => [...productKeys.all, 'filter-meta'] as const,
  list: (params: { page: number; pageSize: number; filters: ProductListFilters }) => [
    ...productKeys.all,
    'list',
    params.page,
    params.pageSize,
    params.filters.search,
    params.filters.brand,
    params.filters.category,
    params.filters.status,
  ] as const,
  detail: (id: string) => [...productKeys.all, 'detail', id] as const,
};
