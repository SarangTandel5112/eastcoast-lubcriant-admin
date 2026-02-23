export type AdminNavigationId
  = | 'home'
    | 'dashboard'
    | 'products'
    | 'categories'
    | 'brands'
    | 'inventory'
    | 'orders'
    | 'dealers'
    | 'promotions'
    | 'invoices'
    | 'ai-logs'
    | 'settings';

export type AdminRoutePath = `/${string}`;

export type AdminNavigationItem = {
  id: AdminNavigationId;
  label: string;
  path: AdminRoutePath;
  description: string;
};

export type AdminLayoutProps = {
  children: React.ReactNode;
  navigation: AdminNavigationItem[];
};
