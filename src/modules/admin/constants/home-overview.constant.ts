import type { HomeActivityItem, HomeHighlightItem, HomeKpiItem } from '../types';

export const HOME_KPI_ITEMS: HomeKpiItem[] = [
  {
    label: 'Revenue (MTD)',
    value: '$284,900',
    trend: '+12.4% vs last month',
  },
  {
    label: 'Open orders',
    value: '186',
    trend: '24 pending approvals',
  },
  {
    label: 'Inventory health',
    value: '94%',
    trend: '8 low-stock items',
  },
];

export const HOME_ACTIVITY_ITEMS: HomeActivityItem[] = [
  {
    title: 'Purchase orders synced',
    details: '42 records imported from ERP in the last run.',
    status: 'Healthy',
    time: '5 minutes ago',
  },
  {
    title: 'Stock threshold warning',
    details: '6 SKUs dropped below safety stock and need review.',
    status: 'Attention',
    time: '18 minutes ago',
  },
  {
    title: 'Promotion expiring soon',
    details: 'Holiday Fleet Discount ends in 3 days.',
    status: 'Upcoming',
    time: '1 hour ago',
  },
];

export const HOME_HIGHLIGHTS: HomeHighlightItem[] = [
  {
    title: 'Fulfillment speed',
    summary: 'Average dispatch time improved by 11% this week.',
  },
  {
    title: 'Dealer response SLA',
    summary: '97% of dealer support tickets answered within target.',
  },
  {
    title: 'Pricing updates',
    summary: '4 category-level pricing updates are queued for review.',
  },
];

export const HOME_QUICK_ACTION_IDS = ['orders', 'products', 'inventory', 'dealers', 'invoices', 'promotions'] as const;
