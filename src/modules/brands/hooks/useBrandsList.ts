'use client';

import type { BrandListFilters } from '../types/brand.types';
import type { ApiError } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { APP_CONFIG } from '@/lib/app-config';
import { brandKeys } from '../query-keys';
import { listBrands } from '../services';

const MASTER_DATA_STALE_TIME_MS = 10 * 60 * 1000;

const parsePage = (value: string | null) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const parseFilters = (params: URLSearchParams): BrandListFilters => {
  return {
    search: params.get('q') ?? '',
    status: (params.get('status') as BrandListFilters['status']) ?? 'all',
  };
};

export const useBrandsList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parsePage(searchParams.get('page'));
  const pageSize = APP_CONFIG.pagination.defaultPageSize;
  const filters = parseFilters(new URLSearchParams(searchParams.toString()));
  const [searchInput, setSearchInput] = useState(filters.search);

  const listQuery = useQuery({
    queryKey: brandKeys.list({
      page,
      pageSize,
      filters,
    }),
    queryFn: () => listBrands({ page, pageSize, filters }),
    staleTime: MASTER_DATA_STALE_TIME_MS,
  });

  const updateParams = (options: {
    page?: number;
    search?: string;
    status?: BrandListFilters['status'];
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

    if (typeof options.status === 'string') {
      if (options.status === 'all') {
        next.delete('status');
      } else {
        next.set('status', options.status);
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

  return {
    data: listQuery.data,
    isLoading: listQuery.isPending,
    isError: listQuery.isError,
    errorMessage: (listQuery.error as ApiError | null)?.message,
    page,
    pageSize,
    filters,
    searchInput,
    setSearchInput,
    onPageChange: (nextPage: number) => {
      updateParams({ page: nextPage });
    },
    onStatusChange: (status: BrandListFilters['status']) => {
      updateParams({
        page: 1,
        status,
      });
    },
    retry: () => {
      listQuery.refetch();
    },
  };
};
