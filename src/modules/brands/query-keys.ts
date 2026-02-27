import type { BrandListFilters } from './types/brand.types';

export const brandKeys = {
  all: ['brands'] as const,
  list: (params: { page: number; pageSize: number; filters: BrandListFilters }) => [
    ...brandKeys.all,
    'list',
    params.page,
    params.pageSize,
    params.filters.search,
    params.filters.status,
  ] as const,
  detail: (id: string) => [...brandKeys.all, 'detail', id] as const,
};
