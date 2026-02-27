import type { MetadataRoute } from 'next';
import { Env } from '@/libs/Env';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = Env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const routes = [
    '/dashboard',
    '/admin/products',
    '/admin/products/create',
    '/admin/categories',
    '/admin/brands',
    '/inventory',
    '/orders',
    '/dealers',
    '/promotions',
    '/invoices',
    '/ai-logs',
    '/settings',
    '/login',
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
