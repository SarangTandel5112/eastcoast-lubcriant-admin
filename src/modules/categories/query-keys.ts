import type { CategoryListFilters } from './types/category.types';

export const categoryKeys = {
  all: ['categories'] as const,
  list: (params: { page: number; pageSize: number; filters: CategoryListFilters }) => [
    ...categoryKeys.all,
    'list',
    params.page,
    params.pageSize,
    params.filters.search,
    params.filters.status,
  ] as const,
  detail: (id: string) => [...categoryKeys.all, 'detail', id] as const,
  options: () => [...categoryKeys.all, 'options'] as const,
};
