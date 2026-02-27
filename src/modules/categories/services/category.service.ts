import type { CategoryEntity, CategoryListQuery, CategoryListResult, CategoryMutationResult, CategorySubmitValues } from '../types/category.types';
import { ApiError, httpClient, normalizeApiError } from '@/lib/api';
import { APP_CONFIG } from '@/lib/app-config';
import { Env } from '@/libs/Env';
import { categoryFormSchema, categoryIdSchema } from '../schemas/category.schema';

const STORAGE_KEY = 'admin-categories-v1';

const seedCategory = (options: {
  idSuffix: number;
  name: string;
  slug: string;
  description: string;
  parentCategoryId?: string;
  isActive?: boolean;
  sortOrder?: number;
}): CategoryEntity => {
  const now = new Date().toISOString();

  return {
    id: `00000000-0000-4000-8000-${String(options.idSuffix).padStart(12, '0')}`,
    name: options.name,
    slug: options.slug,
    description: options.description,
    parentCategoryId: options.parentCategoryId,
    isActive: options.isActive ?? true,
    sortOrder: options.sortOrder ?? 0,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  };
};

const initialCategories = [
  seedCategory({ idSuffix: 1, name: 'Engine oils', slug: 'engine-oils', description: 'All engine oil products', sortOrder: 1 }),
  seedCategory({ idSuffix: 2, name: 'Industrial oils', slug: 'industrial-oils', description: 'Industrial lubricant category', sortOrder: 2 }),
  seedCategory({ idSuffix: 3, name: 'Hydraulic oils', slug: 'hydraulic-oils', description: 'Hydraulic lubricant family', parentCategoryId: '00000000-0000-4000-8000-000000000002', sortOrder: 3 }),
  seedCategory({ idSuffix: 4, name: 'Greases', slug: 'greases', description: 'Grease category', sortOrder: 4 }),
  seedCategory({ idSuffix: 5, name: 'Transmission oils', slug: 'transmission-oils', description: 'Transmission category', sortOrder: 5 }),
];

const supportsRemoteApi = Boolean(Env.NEXT_PUBLIC_API_BASE_URL);
const isBrowser = () => typeof window !== 'undefined';

let memoryStore = initialCategories;

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
    const parsed = JSON.parse(raw) as CategoryEntity[];
    memoryStore = parsed;
    return parsed;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
    return memoryStore;
  }
};

const writeStore = (categories: CategoryEntity[]) => {
  memoryStore = categories;

  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

const withGuard = async <T>(fn: () => Promise<T>) => {
  try {
    return await fn();
  } catch (error) {
    throw normalizeApiError(error);
  }
};

const assertUnique = (categories: CategoryEntity[], options: { name: string; slug: string; ignoreId?: string }) => {
  const normalizedName = options.name.trim().toLowerCase();
  const normalizedSlug = options.slug.trim().toLowerCase();

  const found = categories.find(item => item.id !== options.ignoreId && !item.isDeleted && (item.name.trim().toLowerCase() === normalizedName || item.slug.trim().toLowerCase() === normalizedSlug));

  if (found) {
    throw new ApiError({
      message: 'Category name or slug already exists',
      statusCode: 409,
    });
  }
};

const sanitizePayload = (data: CategorySubmitValues): CategorySubmitValues => {
  return {
    ...data,
    name: data.name.trim(),
    slug: data.slug.trim().toLowerCase(),
    description: data.description.trim(),
  };
};

export const listCategories = async (query: CategoryListQuery): Promise<CategoryListResult> => {
  return withGuard(async () => {
    const safePage = Math.max(1, query.page);
    const safePageSize = Math.max(1, Math.min(query.pageSize, APP_CONFIG.pagination.maxPageSize));

    if (supportsRemoteApi) {
      const response = await httpClient.get<CategoryListResult>('/categories', {
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

export const listCategoryOptions = async (): Promise<Array<{ id: string; name: string }>> => {
  return withGuard(async () => {
    if (supportsRemoteApi) {
      const response = await httpClient.get<Array<{ id: string; name: string }>>('/categories/options');
      return response.data;
    }

    return readStore()
      .filter(item => !item.isDeleted)
      .map(item => ({ id: item.id, name: item.name }));
  });
};

export const createCategory = async (data: CategorySubmitValues): Promise<CategoryMutationResult> => {
  return withGuard(async () => {
    const parsed = categoryFormSchema.parse(data);
    const payload = sanitizePayload(parsed);

    if (supportsRemoteApi) {
      const response = await httpClient.post<CategoryMutationResult>('/categories', payload);
      return response.data;
    }

    const categories = readStore();
    assertUnique(categories, payload);

    const now = new Date().toISOString();
    const category: CategoryEntity = {
      id: crypto.randomUUID(),
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      parentCategoryId: payload.parentCategoryId,
      isActive: payload.isActive,
      sortOrder: payload.sortOrder,
      isDeleted: false,
      createdAt: now,
      updatedAt: now,
    };

    writeStore([category, ...categories]);

    return {
      category,
      message: 'Category created successfully',
    };
  });
};

export const updateCategory = async (id: string, data: CategorySubmitValues): Promise<CategoryMutationResult> => {
  return withGuard(async () => {
    const safeId = categoryIdSchema.parse(id);
    const parsed = categoryFormSchema.parse(data);
    const payload = sanitizePayload(parsed);

    if (supportsRemoteApi) {
      const response = await httpClient.put<CategoryMutationResult>(`/categories/${safeId}`, payload);
      return response.data;
    }

    const categories = readStore();
    const target = categories.find(item => item.id === safeId && !item.isDeleted);

    if (!target) {
      throw new ApiError({
        message: 'Category not found',
        statusCode: 404,
      });
    }

    assertUnique(categories, {
      ...payload,
      ignoreId: safeId,
    });

    const updated: CategoryEntity = {
      ...target,
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      parentCategoryId: payload.parentCategoryId,
      isActive: payload.isActive,
      sortOrder: payload.sortOrder,
      updatedAt: new Date().toISOString(),
    };

    writeStore(categories.map(item => (item.id === safeId ? updated : item)));

    return {
      category: updated,
      message: 'Category updated successfully',
    };
  });
};

export const deleteCategory = async (id: string): Promise<{ message: string }> => {
  return withGuard(async () => {
    const safeId = categoryIdSchema.parse(id);

    if (supportsRemoteApi) {
      await httpClient.patch(`/categories/${safeId}`, { isDeleted: true });
      return { message: 'Category deleted successfully' };
    }

    const categories = readStore();
    const target = categories.find(item => item.id === safeId && !item.isDeleted);

    if (!target) {
      throw new ApiError({
        message: 'Category not found',
        statusCode: 404,
      });
    }

    writeStore(categories.map(item => (item.id === safeId
      ? {
          ...item,
          isDeleted: true,
          updatedAt: new Date().toISOString(),
        }
      : item)));

    return {
      message: 'Category deleted successfully',
    };
  });
};

export const toggleCategoryActive = async (id: string): Promise<CategoryMutationResult> => {
  return withGuard(async () => {
    const safeId = categoryIdSchema.parse(id);

    if (supportsRemoteApi) {
      const response = await httpClient.patch<CategoryMutationResult>(`/categories/${safeId}/toggle-active`);
      return response.data;
    }

    const categories = readStore();
    const target = categories.find(item => item.id === safeId && !item.isDeleted);

    if (!target) {
      throw new ApiError({
        message: 'Category not found',
        statusCode: 404,
      });
    }

    const updated: CategoryEntity = {
      ...target,
      isActive: !target.isActive,
      updatedAt: new Date().toISOString(),
    };

    writeStore(categories.map(item => (item.id === safeId ? updated : item)));

    return {
      category: updated,
      message: 'Category status updated',
    };
  });
};
