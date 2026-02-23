import type { AdminNavigationId } from './admin-navigation.type';

export type AdminPageId = AdminNavigationId;

export type AdminPageMetric = {
  label: string;
  value: string;
  note: string;
};

export type AdminPageConfig = {
  id: AdminPageId;
  title: string;
  description: string;
  actionLabel?: string;
  tableTitle: string;
  tableColumns: string[];
  tableRows?: number;
  metrics?: AdminPageMetric[];
};
