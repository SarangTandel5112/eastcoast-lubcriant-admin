'use client';

import type { ProductFiltersState, ProductQueryResult, ProductViewMode } from './types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchMockProducts, getProductFilterOptions } from './mock-products.api';

const pageSize = 12;

const getPageFromQuery = (value: string | null) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const getFiltersFromParams = (params: URLSearchParams): ProductFiltersState => {
  return {
    brand: params.get('brand') ?? 'all',
    productType: params.get('type') ?? 'all',
    category: params.get('category') ?? 'all',
    status: params.get('status') ?? 'all',
  };
};

export const useProductsListing = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<ProductViewMode>('grid');
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '');
  const [data, setData] = useState<ProductQueryResult | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState<string | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  const params = new URLSearchParams(searchParams.toString());
  const page = getPageFromQuery(params.get('page'));
  const filters = getFiltersFromParams(params);
  const query = params.get('q') ?? '';

  const updateParams = (options: {
    nextSearch?: string;
    nextPage?: number;
    nextFilters?: Partial<ProductFiltersState>;
  }) => {
    const next = new URLSearchParams(searchParams.toString());

    if (typeof options.nextSearch === 'string') {
      if (options.nextSearch.trim()) {
        next.set('q', options.nextSearch.trim());
      } else {
        next.delete('q');
      }
    }

    if (typeof options.nextPage === 'number') {
      next.set('page', String(options.nextPage));
    }

    if (options.nextFilters) {
      const merged = { ...filters, ...options.nextFilters };

      if (merged.brand === 'all') {
        next.delete('brand');
      } else {
        next.set('brand', merged.brand);
      }

      if (merged.productType === 'all') {
        next.delete('type');
      } else {
        next.set('type', merged.productType);
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

    const nextQuery = next.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      updateParams({
        nextSearch: searchInput,
        nextPage: 1,
      });
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await fetchMockProducts({
          page,
          pageSize,
          search: query,
          filters,
        });

        if (!isMounted) {
          return;
        }

        setData(result);
      } catch {
        if (!isMounted) {
          return;
        }

        setIsError(true);
        setErrorToastMessage('Failed to load products');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [page, query, filters.brand, filters.productType, filters.category, filters.status, refreshKey]);

  useEffect(() => {
    if (!errorToastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setErrorToastMessage(undefined);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [errorToastMessage]);

  return {
    data,
    filters,
    filterOptions: getProductFilterOptions(),
    isLoading,
    isError,
    errorToastMessage,
    page,
    pageSize,
    query,
    searchInput,
    viewMode,
    setViewMode,
    setSearchInput,
    onFilterChange: (key: keyof ProductFiltersState, value: string) => {
      updateParams({
        nextFilters: {
          [key]: value,
        },
        nextPage: 1,
      });
    },
    onPageChange: (nextPage: number) => {
      updateParams({ nextPage });
    },
    retry: () => {
      setRefreshKey(previous => previous + 1);
    },
    clearErrorToast: () => {
      setErrorToastMessage(undefined);
    },
  };
};
