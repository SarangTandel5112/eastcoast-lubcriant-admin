import type { AdminNavItem } from '../types/admin.types';
import { Badge, Button, Separator } from '@/modules/common';

export const AdminHeader = (props: {
  activeItem?: AdminNavItem;
}) => {
  return (
    <header className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6 py-4">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-400">Admin</p>
          <h1 className="text-lg font-semibold text-neutral-100">
            {props.activeItem?.label ?? 'Dashboard'}
          </h1>
        </div>
        <Separator className="mx-2 hidden h-6 w-px bg-neutral-800 lg:block" />
        <Badge variant="muted">Enterprise</Badge>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          Help
        </Button>
        <Button size="sm">Admin User</Button>
      </div>
    </header>
  );
};
