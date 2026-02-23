import type { AdminNavItem } from '../types/admin.types';

export function getActiveNavItem(
  items: AdminNavItem[],
  pathname: string,
) {
  return items.find(item => pathname.startsWith(item.path));
}
