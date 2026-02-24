'use client';

import type { AdminModuleFilterDefinition, AdminModuleListPageId, AdminModuleQueryResult, AdminModuleViewMode } from '../types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ADMIN_MODULE_LISTING_CONFIG, fetchAdminModuleRecords } from '../constants';

const PAGE_SIZE = 10;

const getPageFromQuery = (value: string | null) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const getFilterStateFromParams = (params: URLSearchParams, definitions: AdminModuleFilterDefinition[]) => {
  return definitions.reduce<Record<string, string>>((accumulator, definition) => {
    accumulator[definition.key] = params.get(definition.key) ?? 'all';
    return accumulator;
  }, {});
};

export const useAdminModuleListing = (pageId: AdminModuleListPageId) => {
  const config = ADMIN_MODULE_LISTING_CONFIG[pageId];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<AdminModuleViewMode>(config.supportsImageView ? 'grid' : 'list');
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '');
  const [data, setData] = useState<AdminModuleQueryResult | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState<string | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  const page = getPageFromQuery(searchParams.get('page'));
  const filters = getFilterStateFromParams(new URLSearchParams(searchParams.toString()), config.filters);
  const query = searchParams.get('q') ?? '';
  const filterSignature = config.filters.map(definition => `${definition.key}:${filters[definition.key] ?? 'all'}`).join('|');

  const updateParams = (options: {
    nextSearch?: string;
    nextPage?: number;
    nextFilters?: Partial<Record<string, string>>;
  }) => {
    const next = new URLSearchParams(searchParams.toString());

    if (typeof options.nextSearch === 'string') {
      const value = options.nextSearch.trim();

      if (value) {
        next.set('q', value);
      } else {
        next.delete('q');
      }
    }

    if (typeof options.nextPage === 'number') {
      next.set('page', String(options.nextPage));
    }

    if (options.nextFilters) {
      const merged = { ...filters, ...options.nextFilters };

      for (const definition of config.filters) {
        const nextValue = merged[definition.key] ?? 'all';

        if (nextValue === 'all') {
          next.delete(definition.key);
        } else {
          next.set(definition.key, nextValue);
        }
      }
    }

    const nextQuery = next.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      updateParams({ nextSearch: searchInput, nextPage: 1 });
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchInput]);

  useEffect(() => {
    let isMounted = true;

    const runQuery = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await fetchAdminModuleRecords({
          config,
          query: {
            page,
            pageSize: PAGE_SIZE,
            search: query,
            filters,
          },
        });

        if (isMounted) {
          setData(result);
        }
      } catch {
        if (isMounted) {
          setIsError(true);
          setErrorToastMessage(`Failed to load ${pageId.replace('-', ' ')} records`);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    runQuery();

    return () => {
      isMounted = false;
    };
  }, [config, filterSignature, page, pageId, query, refreshKey]);

  useEffect(() => {
    if (!errorToastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setErrorToastMessage(undefined);
    }, 3200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [errorToastMessage]);

  return {
    config,
    data,
    filters,
    isLoading,
    isError,
    errorToastMessage,
    page,
    pageSize: PAGE_SIZE,
    query,
    searchInput,
    viewMode,
    setViewMode,
    setSearchInput,
    onFilterChange: (key: string, value: string) => {
      updateParams({
        nextFilters: { [key]: value },
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
