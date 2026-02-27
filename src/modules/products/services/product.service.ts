import type { ProductEntity, ProductListQuery, ProductListResult, ProductMutationResult, ProductSubmitValues } from '../types/product.types';
import { z } from 'zod';
import { ApiError, httpClient, normalizeApiError } from '@/lib/api';
import { APP_CONFIG } from '@/lib/app-config';
import { Env } from '@/libs/Env';
import { productIdSchema, productSubmitSchema } from '../schemas/product.schema';

const STORAGE_KEY = 'admin-products-v2';

const uuidSchema = z.string().uuid();

const createSeedProduct = (index: number): ProductEntity => {
  const id = `00000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`;
  const now = new Date(Date.now() - index * 86_400_000).toISOString();
  const brand = ['Shell', 'Mobil', 'Castrol', 'Valvoline'][index % 4] ?? 'Shell';
  const category = ['Industrial', 'Automotive', 'Heavy duty'][index % 3] ?? 'Industrial';

  return {
    id,
    name: `${brand} Lubricant ${index + 1}`,
    sku: `SKU-${1000 + index}`,
    category,
    brand,
    description: `${brand} product for ${category.toLowerCase()} operations`,
    sae: index % 2 === 0 ? '5W-30' : '15W-40',
    api: 'API SN',
    acea: 'ACEA C3',
    oemApprovals: ['OEM A', 'OEM B'],
    viscosity: index % 2 === 0 ? 'Medium' : 'High',
    baseOilType: index % 2 === 0 ? 'Synthetic' : 'Semi-synthetic',
    packSize: index % 2 === 0 ? '4' : '20',
    unit: 'L',
    minimumOrderQty: 1,
    basePrice: 40 + index,
    tierPricing: [
      { tierName: 'Dealer', minQty: 10, price: 37 + index },
      { tierName: 'Distributor', minQty: 50, price: 34 + index },
    ],
    isActive: index % 5 !== 0,
    isFeatured: index % 7 === 0,
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
    imageUrl: `https://picsum.photos/seed/lubricant-${index + 1}/640/480`,
  };
};

const createSeedProducts = () => {
  return Array.from({ length: 48 }, (_, index) => createSeedProduct(index));
};

const isBrowser = () => typeof window !== 'undefined';

const getInMemoryStore = () => {
  const seeded = createSeedProducts();
  return seeded;
};

let memoryStore = getInMemoryStore();

const readLocalStore = () => {
  if (!isBrowser()) {
    return memoryStore;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
    return memoryStore;
  }

  try {
    const parsed = JSON.parse(raw) as ProductEntity[];
    memoryStore = parsed;
    return parsed;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
    return memoryStore;
  }
};

const saveLocalStore = (products: ProductEntity[]) => {
  memoryStore = products;

  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

const assertSkuUnique = (products: ProductEntity[], sku: string, currentId?: string) => {
  const normalizedSku = sku.trim().toLowerCase();
  const matched = products.find(item => item.sku.toLowerCase() === normalizedSku && item.id !== currentId && !item.isDeleted);

  if (matched) {
    throw new ApiError({
      message: 'SKU already exists',
      statusCode: 409,
    });
  }
};

const buildPayload = (data: ProductSubmitValues): ProductSubmitValues => {
  return {
    ...data,
    name: data.name.trim(),
    sku: data.sku.trim().toUpperCase(),
    category: data.category.trim(),
    brand: data.brand.trim(),
    description: data.description.trim(),
    sae: data.sae.trim(),
    api: data.api.trim(),
    acea: data.acea.trim(),
    oemApprovals: data.oemApprovals.map(item => item.trim()).filter(Boolean),
    viscosity: data.viscosity.trim(),
    baseOilType: data.baseOilType.trim(),
    packSize: data.packSize.trim(),
    unit: data.unit.trim(),
    tierPricing: data.tierPricing.map(item => ({
      tierName: item.tierName.trim(),
      minQty: item.minQty,
      price: item.price,
    })),
  };
};

const supportsRemoteApi = Boolean(Env.NEXT_PUBLIC_API_BASE_URL);

const withServiceGuard = <T>(handler: () => Promise<T>) => {
  return handler().catch((error) => {
    throw normalizeApiError(error);
  });
};

export const listProducts = async (query: ProductListQuery): Promise<ProductListResult> => {
  return withServiceGuard(async () => {
    const safePage = Math.max(1, query.page);
    const safePageSize = Math.max(1, Math.min(query.pageSize, APP_CONFIG.pagination.maxPageSize));

    if (supportsRemoteApi) {
      const response = await httpClient.get<ProductListResult>('/products', {
        params: {
          page: safePage,
          pageSize: safePageSize,
          search: query.filters.search,
          category: query.filters.category,
          brand: query.filters.brand,
          status: query.filters.status,
        },
      });

      return response.data;
    }

    const products = readLocalStore().filter(item => !item.isDeleted);
    const normalizedSearch = query.filters.search.trim().toLowerCase();
    const filtered = products.filter((item) => {
      const status = item.isActive ? 'active' : 'inactive';

      if (query.filters.status !== 'all' && query.filters.status !== status) {
        return false;
      }

      if (query.filters.category !== 'all' && item.category !== query.filters.category) {
        return false;
      }

      if (query.filters.brand !== 'all' && item.brand !== query.filters.brand) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return `${item.name} ${item.sku} ${item.brand} ${item.category}`.toLowerCase().includes(normalizedSearch);
    });

    const start = (safePage - 1) * safePageSize;

    return {
      items: filtered.slice(start, start + safePageSize),
      total: filtered.length,
      page: safePage,
      pageSize: safePageSize,
    };
  });
};

export const getProductById = async (id: string): Promise<ProductEntity> => {
  return withServiceGuard(async () => {
    const safeId = productIdSchema.parse(id);

    if (supportsRemoteApi) {
      const response = await httpClient.get<ProductEntity>(`/products/${safeId}`);
      return response.data;
    }

    const product = readLocalStore().find(item => item.id === safeId && !item.isDeleted);

    if (!product) {
      throw new ApiError({
        message: 'Product not found',
        statusCode: 404,
      });
    }

    return product;
  });
};

export const createProduct = async (data: ProductSubmitValues): Promise<ProductMutationResult> => {
  return withServiceGuard(async () => {
    const parsed = productSubmitSchema.parse(data);
    const payload = buildPayload(parsed);

    if (supportsRemoteApi) {
      const response = await httpClient.post<ProductMutationResult>('/products', payload);
      return response.data;
    }

    const products = readLocalStore();
    assertSkuUnique(products, payload.sku);

    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    uuidSchema.parse(id);

    const product: ProductEntity = {
      id,
      ...payload,
      isDeleted: false,
      createdAt: now,
      updatedAt: now,
      imageUrl: `https://picsum.photos/seed/${id}/640/480`,
    };

    saveLocalStore([product, ...products]);

    return {
      product,
      message: 'Product created successfully',
    };
  });
};

export const updateProduct = async (id: string, data: ProductSubmitValues): Promise<ProductMutationResult> => {
  return withServiceGuard(async () => {
    const safeId = productIdSchema.parse(id);
    const parsed = productSubmitSchema.parse(data);
    const payload = buildPayload(parsed);

    if (supportsRemoteApi) {
      const response = await httpClient.put<ProductMutationResult>(`/products/${safeId}`, payload);
      return response.data;
    }

    const products = readLocalStore();
    const target = products.find(item => item.id === safeId && !item.isDeleted);

    if (!target) {
      throw new ApiError({
        message: 'Product not found',
        statusCode: 404,
      });
    }

    assertSkuUnique(products, payload.sku, safeId);

    const updated: ProductEntity = {
      ...target,
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    saveLocalStore(products.map(item => (item.id === safeId ? updated : item)));

    return {
      product: updated,
      message: 'Product updated successfully',
    };
  });
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  return withServiceGuard(async () => {
    const safeId = productIdSchema.parse(id);

    if (supportsRemoteApi) {
      await httpClient.patch(`/products/${safeId}`, { isDeleted: true });
      return { message: 'Product deleted successfully' };
    }

    const products = readLocalStore();
    const target = products.find(item => item.id === safeId && !item.isDeleted);

    if (!target) {
      throw new ApiError({
        message: 'Product not found',
        statusCode: 404,
      });
    }

    const updated = products.map(item => (item.id === safeId
      ? {
          ...item,
          isDeleted: true,
          updatedAt: new Date().toISOString(),
        }
      : item));

    saveLocalStore(updated);

    return { message: 'Product deleted successfully' };
  });
};

export const getProductFilterMeta = async (): Promise<{ brands: string[]; categories: string[] }> => {
  return withServiceGuard(async () => {
    const products = readLocalStore().filter(item => !item.isDeleted);
    const brands = Array.from(new Set(products.map(item => item.brand))).filter(Boolean).sort((a, b) => a.localeCompare(b));
    const categories = Array.from(new Set(products.map(item => item.category))).filter(Boolean).sort((a, b) => a.localeCompare(b));

    return { brands, categories };
  });
};
