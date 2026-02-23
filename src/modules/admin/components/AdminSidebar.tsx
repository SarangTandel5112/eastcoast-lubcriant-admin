import Link from 'next/link';
import { AppLogo, buttonVariants, cn } from '@/modules/common';
import { ADMIN_NAV_ITEMS } from '../constants/admin-nav';

export const AdminSidebar = (props: { activePath: string }) => {
  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-neutral-800 bg-neutral-950 px-4 py-6 lg:flex">
      <div className="px-2">
        <AppLogo />
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {ADMIN_NAV_ITEMS.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              buttonVariants({
                variant: props.activePath.startsWith(item.path)
                  ? 'default'
                  : 'ghost',
              }),
              'w-full justify-start text-neutral-100',
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-xs text-neutral-400">
        Admin Panel
        <div className="mt-1 text-[11px]">Version 1.0</div>
      </div>
    </aside>
  );
};
