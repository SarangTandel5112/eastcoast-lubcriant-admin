'use client';

import { usePathname } from 'next/navigation';
import { ADMIN_NAV_ITEMS } from '../constants/admin-nav';
import { getActiveNavItem } from '../helpers/admin-nav.helper';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { PageContainer } from './PageContainer';

export const AdminShell = (props: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLogin = pathname === '/login';
  const activeItem = getActiveNavItem(ADMIN_NAV_ITEMS, pathname);

  if (isLogin) {
    return (
      <div className="min-h-screen bg-neutral-950">
        {props.children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="flex">
        <AdminSidebar activePath={pathname} />
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminHeader activeItem={activeItem} />
          <PageContainer>{props.children}</PageContainer>
        </div>
      </div>
    </div>
  );
};
