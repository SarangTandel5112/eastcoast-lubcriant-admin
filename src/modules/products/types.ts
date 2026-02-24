export type ProductListItem = {
  id: string;
  name: string;
  brand: string;
  productType: string;
  category: string;
  image: string;
  isActive: boolean;
  variantCount: number;
  priceMin: number;
  priceMax: number;
  createdAt: string;
};

export type ProductFiltersState = {
  brand: string;
  productType: string;
  category: string;
  status: string;
};

export type ProductQueryOptions = {
  page: number;
  pageSize: number;
  search: string;
  filters: ProductFiltersState;
};

export type ProductQueryResult = {
  items: ProductListItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductViewMode = 'grid' | 'list';
