import type { AdminNavigationItem } from '../types';

export const ADMIN_NAVIGATION: AdminNavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    description: 'Operational summary and quick actions',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    description: 'KPIs and recent activity',
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    description: 'Manage product catalog and lifecycle',
  },
  {
    id: 'categories',
    label: 'Categories',
    path: '/admin/categories',
    description: 'Organize product categories',
  },
  {
    id: 'brands',
    label: 'Brands',
    path: '/admin/brands',
    description: 'Maintain brand details',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    path: '/inventory',
    description: 'Stock and adjustments overview',
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/orders',
    description: 'Track order lifecycle',
  },
  {
    id: 'dealers',
    label: 'Dealers',
    path: '/dealers',
    description: 'Dealer management workspace',
  },
  {
    id: 'promotions',
    label: 'Promotions',
    path: '/promotions',
    description: 'Campaign and discount control',
  },
  {
    id: 'invoices',
    label: 'Invoices',
    path: '/invoices',
    description: 'Billing and payment status',
  },
  {
    id: 'ai-logs',
    label: 'AI Logs',
    path: '/ai-logs',
    description: 'AI call summaries and statuses',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    description: 'Admin preferences and defaults',
  },
];
