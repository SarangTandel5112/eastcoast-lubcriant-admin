import type { AdminPageId } from './admin-page.type';

export type AdminModuleListPageId = Exclude<AdminPageId, 'home' | 'products'>;

export type AdminModuleFilterOption = {
  label: string;
  value: string;
};

export type AdminModuleFilterDefinition = {
  key: string;
  label: string;
  options: AdminModuleFilterOption[];
};

export type AdminModuleRecord = {
  id: string;
  title: string;
  subtitle: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  primaryMetric: string;
  secondaryMetric: string;
  imageUrl?: string;
  tableValues: string[];
  filterValues: Record<string, string>;
};

export type AdminModuleListingConfig = {
  supportsImageView: boolean;
  filters: AdminModuleFilterDefinition[];
  records: AdminModuleRecord[];
};

export type AdminModuleQueryOptions = {
  page: number;
  pageSize: number;
  search: string;
  filters: Record<string, string>;
};

export type AdminModuleQueryResult = {
  items: AdminModuleRecord[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminModuleViewMode = 'grid' | 'list';
