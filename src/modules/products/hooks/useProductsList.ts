'use client';

import type { ProductListFilters } from '../types/product.types';
import type { ApiError } from '@/lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { APP_CONFIG } from '@/lib/app-config';
import { productKeys } from '../query-keys';
import { getProductFilterMeta, listProducts } from '../services/product.service';

const getPageFromSearch = (value: string | null) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const getFiltersFromParams = (params: URLSearchParams): ProductListFilters => {
  return {
    search: params.get('q') ?? '',
    brand: params.get('brand') ?? 'all',
    category: params.get('category') ?? 'all',
    status: (params.get('status') as ProductListFilters['status']) ?? 'all',
  };
};

export const useProductsList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '');

  const page = getPageFromSearch(searchParams.get('page'));
  const pageSize = APP_CONFIG.pagination.defaultPageSize;
  const filters = getFiltersFromParams(new URLSearchParams(searchParams.toString()));

  const listQueryKey = productKeys.list({
    page,
    pageSize,
    filters,
  });

  const updateParams = (options: {
    page?: number;
    search?: string;
    filters?: Partial<ProductListFilters>;
  }) => {
    const next = new URLSearchParams(searchParams.toString());

    if (typeof options.page === 'number') {
      next.set('page', String(options.page));
    }

    if (typeof options.search === 'string') {
      const value = options.search.trim();
      if (value) {
        next.set('q', value);
      } else {
        next.delete('q');
      }
    }

    if (options.filters) {
      const merged: ProductListFilters = {
        ...filters,
        ...options.filters,
      };

      if (merged.brand === 'all') {
        next.delete('brand');
      } else {
        next.set('brand', merged.brand);
      }

      if (merged.category === 'all') {
        next.delete('category');
      } else {
        next.set('category', merged.category);
      }

      if (merged.status === 'all') {
        next.delete('status');
      } else {
        next.set('status', merged.status);
      }
    }

    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      updateParams({
        page: 1,
        search: searchInput,
      });
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchInput]);

  const listQuery = useQuery({
    queryKey: listQueryKey,
    queryFn: async () => {
      return listProducts({
        page,
        pageSize,
        filters,
      });
    },
  });

  const filterMetaQuery = useQuery({
    queryKey: productKeys.filterMeta(),
    queryFn: getProductFilterMeta,
  });

  return {
    data: listQuery.data,
    isLoading: listQuery.isPending || filterMetaQuery.isPending,
    isError: listQuery.isError || filterMetaQuery.isError,
    errorMessage: (listQuery.error as ApiError | null)?.message ?? (filterMetaQuery.error as ApiError | null)?.message,
    viewMode,
    setViewMode,
    page,
    pageSize,
    filters,
    brands: filterMetaQuery.data?.brands ?? [],
    categories: filterMetaQuery.data?.categories ?? [],
    searchInput,
    setSearchInput,
    queryKey: listQueryKey,
    onPageChange: (nextPage: number) => {
      updateParams({ page: nextPage });
    },
    onFilterChange: (key: keyof Omit<ProductListFilters, 'search'>, value: string) => {
      updateParams({
        page: 1,
        filters: {
          [key]: value,
        },
      });
    },
    retry: () => {
      listQuery.refetch();
      filterMetaQuery.refetch();
    },
    removeItemFromList: (id: string) => {
      queryClient.setQueryData(listQueryKey, (previous: typeof listQuery.data) => {
        if (!previous) {
          return previous;
        }

        return {
          ...previous,
          items: previous.items.filter(item => item.id !== id),
          total: Math.max(0, previous.total - 1),
        };
      });
    },
  };
};
