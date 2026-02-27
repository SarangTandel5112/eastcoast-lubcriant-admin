import type { BrandEntity, BrandListQuery, BrandListResult, BrandMutationResult, BrandSubmitValues } from '../types/brand.types';
import { ApiError, httpClient, normalizeApiError } from '@/lib/api';
import { APP_CONFIG } from '@/lib/app-config';
import { Env } from '@/libs/Env';
import { brandFormSchema, brandIdSchema } from '../schemas';

const STORAGE_KEY = 'admin-brands-v1';

const seedBrand = (options: {
  idSuffix: number;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  isActive?: boolean;
  sortOrder?: number;
}): BrandEntity => {
  const now = new Date().toISOString();

  return {
    id: `00000000-0000-4000-8000-${String(options.idSuffix).padStart(12, '0')}`,
    name: options.name,
    slug: options.slug,
    logoUrl: options.logoUrl,
    description: options.description,
    isActive: options.isActive ?? true,
    sortOrder: options.sortOrder ?? 0,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  };
};

const initialBrands = [
  seedBrand({ idSuffix: 101, name: 'Shell', slug: 'shell', logoUrl: 'https://picsum.photos/seed/brand-shell/120/120', description: 'Shell lubricant portfolio', sortOrder: 1 }),
  seedBrand({ idSuffix: 102, name: 'Castrol', slug: 'castrol', logoUrl: 'https://picsum.photos/seed/brand-castrol/120/120', description: 'Castrol industrial range', sortOrder: 2 }),
  seedBrand({ idSuffix: 103, name: 'Mobil', slug: 'mobil', logoUrl: 'https://picsum.photos/seed/brand-mobil/120/120', description: 'Mobil premium solutions', sortOrder: 3 }),
  seedBrand({ idSuffix: 104, name: 'Valvoline', slug: 'valvoline', logoUrl: 'https://picsum.photos/seed/brand-valvoline/120/120', description: 'Valvoline product line', sortOrder: 4 }),
];

const supportsRemoteApi = Boolean(Env.NEXT_PUBLIC_API_BASE_URL);
const isBrowser = () => typeof window !== 'undefined';

let memoryStore = initialBrands;

const readStore = () => {
  if (!isBrowser()) {
    return memoryStore;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
    return memoryStore;
  }

  try {
    const parsed = JSON.parse(raw) as BrandEntity[];
    memoryStore = parsed;
    return parsed;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
    return memoryStore;
  }
};

const writeStore = (brands: BrandEntity[]) => {
  memoryStore = brands;

  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(brands));
};

const withGuard = async <T>(fn: () => Promise<T>) => {
  try {
    return await fn();
  } catch (error) {
    throw normalizeApiError(error);
  }
};

const assertUnique = (brands: BrandEntity[], options: { name: string; slug: string; ignoreId?: string }) => {
  const normalizedName = options.name.trim().toLowerCase();
  const normalizedSlug = options.slug.trim().toLowerCase();

  const found = brands.find(item => item.id !== options.ignoreId && !item.isDeleted && (item.name.trim().toLowerCase() === normalizedName || item.slug.trim().toLowerCase() === normalizedSlug));

  if (found) {
    throw new ApiError({
      message: 'Brand name or slug already exists',
      statusCode: 409,
    });
  }
};

const sanitizePayload = (data: BrandSubmitValues): BrandSubmitValues => {
  return {
    ...data,
    name: data.name.trim(),
    slug: data.slug.trim().toLowerCase(),
    logoUrl: data.logoUrl.trim(),
    description: data.description.trim(),
  };
};

export const listBrands = async (query: BrandListQuery): Promise<BrandListResult> => {
  return withGuard(async () => {
    const safePage = Math.max(1, query.page);
    const safePageSize = Math.max(1, Math.min(query.pageSize, APP_CONFIG.pagination.maxPageSize));

    if (supportsRemoteApi) {
      const response = await httpClient.get<BrandListResult>('/brands', {
        params: {
          page: safePage,
          pageSize: safePageSize,
          search: query.filters.search,
          status: query.filters.status,
        },
      });

      return response.data;
    }

    const normalizedSearch = query.filters.search.trim().toLowerCase();
    const filtered = readStore()
      .filter(item => !item.isDeleted)
      .filter((item) => {
        if (query.filters.status !== 'all') {
          const status = item.isActive ? 'active' : 'inactive';
          if (query.filters.status !== status) {
            return false;
          }
        }

        if (!normalizedSearch) {
          return true;
        }

        return `${item.name} ${item.slug}`.toLowerCase().includes(normalizedSearch);
      })
      .sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name));

    const start = (safePage - 1) * safePageSize;

    return {
      items: filtered.slice(start, start + safePageSize),
      total: filtered.length,
      page: safePage,
      pageSize: safePageSize,
    };
  });
};

export const createBrand = async (data: BrandSubmitValues): Promise<BrandMutationResult> => {
  return withGuard(async () => {
    const parsed = brandFormSchema.parse(data);
    const payload = sanitizePayload(parsed);

    if (supportsRemoteApi) {
      const response = await httpClient.post<BrandMutationResult>('/brands', payload);
      return response.data;
    }

    const brands = readStore();
    assertUnique(brands, payload);

    const now = new Date().toISOString();
    const brand: BrandEntity = {
      id: crypto.randomUUID(),
      name: payload.name,
      slug: payload.slug,
      logoUrl: payload.logoUrl,
      description: payload.description,
      isActive: payload.isActive,
      sortOrder: payload.sortOrder,
      isDeleted: false,
      createdAt: now,
      updatedAt: now,
    };

    writeStore([brand, ...brands]);

    return {
      brand,
      message: 'Brand created successfully',
    };
  });
};

export const updateBrand = async (id: string, data: BrandSubmitValues): Promise<BrandMutationResult> => {
  return withGuard(async () => {
    const safeId = brandIdSchema.parse(id);
    const parsed = brandFormSchema.parse(data);
    const payload = sanitizePayload(parsed);

    if (supportsRemoteApi) {
      const response = await httpClient.put<BrandMutationResult>(`/brands/${safeId}`, payload);
      return response.data;
    }

    const brands = readStore();
    const target = brands.find(item => item.id === safeId && !item.isDeleted);

    if (!target) {
      throw new ApiError({
        message: 'Brand not found',
        statusCode: 404,
      });
    }

    assertUnique(brands, {
      ...payload,
      ignoreId: safeId,
    });

    const updated: BrandEntity = {
      ...target,
      name: payload.name,
      slug: payload.slug,
      logoUrl: payload.logoUrl,
      description: payload.description,
      isActive: payload.isActive,
      sortOrder: payload.sortOrder,
      updatedAt: new Date().toISOString(),
    };

    writeStore(brands.map(item => (item.id === safeId ? updated : item)));

    return {
      brand: updated,
      message: 'Brand updated successfully',
    };
  });
};

export const deleteBrand = async (id: string): Promise<{ message: string }> => {
  return withGuard(async () => {
    const safeId = brandIdSchema.parse(id);

    if (supportsRemoteApi) {
      await httpClient.patch(`/brands/${safeId}`, { isDeleted: true });
      return { message: 'Brand deleted successfully' };
    }

    const brands = readStore();
    const target = brands.find(item => item.id === safeId && !item.isDeleted);

    if (!target) {
      throw new ApiError({
        message: 'Brand not found',
        statusCode: 404,
      });
    }

    writeStore(brands.map(item => (item.id === safeId
      ? {
          ...item,
          isDeleted: true,
          updatedAt: new Date().toISOString(),
        }
      : item)));

    return {
      message: 'Brand deleted successfully',
    };
  });
};

export const toggleBrandActive = async (id: string): Promise<BrandMutationResult> => {
  return withGuard(async () => {
    const safeId = brandIdSchema.parse(id);

    if (supportsRemoteApi) {
      const response = await httpClient.patch<BrandMutationResult>(`/brands/${safeId}/toggle-active`);
      return response.data;
    }

    const brands = readStore();
    const target = brands.find(item => item.id === safeId && !item.isDeleted);

    if (!target) {
      throw new ApiError({
        message: 'Brand not found',
        statusCode: 404,
      });
    }

    const updated: BrandEntity = {
      ...target,
      isActive: !target.isActive,
      updatedAt: new Date().toISOString(),
    };

    writeStore(brands.map(item => (item.id === safeId ? updated : item)));

    return {
      brand: updated,
      message: 'Brand status updated',
    };
  });
};
