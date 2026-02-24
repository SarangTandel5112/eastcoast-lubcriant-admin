'use client';

import type { AdminModuleListPageId, AdminModuleRecord } from '../../types';
import Image from 'next/image';
import { Badge, Button, buttonVariants, Card, CardContent, CardHeader, CardTitle, cn, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';
import { ADMIN_PAGE_CONFIG } from '../../constants';
import { useAdminModuleListing } from '../../hooks';
import { AdminModulePagination } from './admin-module-pagination';

export type AdminModulePageProps = {
  pageId: AdminModuleListPageId;
};

type ThemeConfig = {
  badgeClassName: string;
  gradientClassName: string;
};

const MODULE_THEME: Record<AdminModuleListPageId, ThemeConfig> = {
  'dashboard': {
    badgeClassName: 'border-blue-500/30 bg-blue-500/10 text-blue-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_44%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.15),_transparent_50%)]',
  },
  'categories': {
    badgeClassName: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.2),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_50%)]',
  },
  'brands': {
    badgeClassName: 'border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(192,38,211,0.2),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.12),_transparent_50%)]',
  },
  'inventory': {
    badgeClassName: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(5,150,105,0.22),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_50%)]',
  },
  'orders': {
    badgeClassName: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(8,145,178,0.22),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.1),_transparent_50%)]',
  },
  'dealers': {
    badgeClassName: 'border-teal-500/30 bg-teal-500/10 text-teal-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.2),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_50%)]',
  },
  'promotions': {
    badgeClassName: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.2),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(217,70,239,0.12),_transparent_50%)]',
  },
  'invoices': {
    badgeClassName: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.2),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.15),_transparent_50%)]',
  },
  'ai-logs': {
    badgeClassName: 'border-sky-500/30 bg-sky-500/10 text-sky-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.2),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_50%)]',
  },
  'settings': {
    badgeClassName: 'border-neutral-600/60 bg-neutral-700/40 text-neutral-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(82,82,91,0.22),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.08),_transparent_50%)]',
  },
};

const statusToBadgeVariant = (status: AdminModuleRecord['status']) => {
  if (status === 'active') {
    return 'success';
  }

  if (status === 'inactive') {
    return 'muted';
  }

  return 'default';
};

const toReadableStatus = (status: AdminModuleRecord['status']) => {
  return `${status.charAt(0).toUpperCase()}${status.slice(1)}`;
};

const selectClassName = 'h-9 rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

const renderListSkeleton = (columnCount: number) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }, (_, rowIndex) => (
        <div key={`row-skeleton-${rowIndex}`} className="grid grid-cols-1 gap-2 rounded-lg border border-neutral-800 bg-neutral-950/60 p-3 md:grid-cols-3">
          {Array.from({ length: Math.max(columnCount, 3) }, (_, colIndex) => (
            <div key={`cell-skeleton-${rowIndex}-${colIndex}`} className="h-3 rounded bg-neutral-800/80" />
          ))}
        </div>
      ))}
    </div>
  );
};

const renderGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <Card key={`grid-skeleton-${index}`} className="border-neutral-800 bg-neutral-900/60">
          <CardContent className="space-y-4 p-4">
            <div className="aspect-[16/10] rounded-lg bg-neutral-800/70" />
            <div className="h-4 rounded bg-neutral-800/70" />
            <div className="h-3 w-2/3 rounded bg-neutral-800/60" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const renderGridCard = (record: AdminModuleRecord) => {
  return (
    <Card key={record.id} className="overflow-hidden border-neutral-800 bg-neutral-900/60">
      <CardContent className="p-0">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-neutral-800 bg-neutral-950">
          {record.imageUrl
            ? (
                <Image
                  src={record.imageUrl}
                  alt={record.title}
                  fill
                  className="object-cover transition duration-200 hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              )
            : null}
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-neutral-100">{record.title}</p>
              <p className="text-sm text-neutral-400">{record.subtitle}</p>
            </div>
            <Badge variant={statusToBadgeVariant(record.status)}>{toReadableStatus(record.status)}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-md border border-neutral-800 bg-neutral-950/70 p-2 text-xs text-neutral-300">
            <span>{record.primaryMetric}</span>
            <span className="text-right">{record.secondaryMetric}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const AdminModulePage = (props: AdminModulePageProps) => {
  const pageConfig = ADMIN_PAGE_CONFIG[props.pageId];
  const listing = useAdminModuleListing(props.pageId);
  const records = listing.data?.items ?? [];
  const theme = MODULE_THEME[props.pageId];

  return (
    <div className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <div className={cn('pointer-events-none absolute inset-0', theme.gradientClassName)} />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge className={theme.badgeClassName}>{pageConfig.title}</Badge>
            <h2 className="text-3xl leading-tight font-semibold text-neutral-50 md:text-4xl">
              {pageConfig.title}
            </h2>
            <p className="text-sm text-neutral-300 md:text-base">{pageConfig.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {pageConfig.actionLabel ? <Button>{pageConfig.actionLabel}</Button> : null}
            {listing.config.supportsImageView
              ? (
                  <div className="inline-flex rounded-md border border-neutral-800 bg-neutral-950 p-1">
                    <button
                      type="button"
                      className={cn(
                        buttonVariants({ size: 'sm', variant: listing.viewMode === 'grid' ? 'default' : 'ghost' }),
                      )}
                      onClick={() => listing.setViewMode('grid')}
                    >
                      Grid
                    </button>
                    <button
                      type="button"
                      className={cn(
                        buttonVariants({ size: 'sm', variant: listing.viewMode === 'list' ? 'default' : 'ghost' }),
                      )}
                      onClick={() => listing.setViewMode('list')}
                    >
                      List
                    </button>
                  </div>
                )
              : null}
          </div>
        </div>
      </section>

      <Card className="border-neutral-800 bg-neutral-900/60">
        <CardContent className="space-y-4 p-4 md:p-5">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
            <Input
              value={listing.searchInput}
              onChange={event => listing.setSearchInput(event.target.value)}
              placeholder={`Search ${pageConfig.title.toLowerCase()}`}
            />

            {listing.config.filters.map(filter => (
              <select
                key={filter.key}
                className={selectClassName}
                value={listing.filters[filter.key] ?? 'all'}
                onChange={event => listing.onFilterChange(filter.key, event.target.value)}
              >
                {filter.options.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ))}
          </div>
        </CardContent>
      </Card>

      {listing.errorToastMessage
        ? (
            <div className="fixed top-4 right-4 z-50 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200 shadow-lg">
              <div className="flex items-center gap-3">
                <span>{listing.errorToastMessage}</span>
                <button
                  type="button"
                  onClick={listing.clearErrorToast}
                  className="text-red-200/80 hover:text-red-100"
                >
                  Close
                </button>
              </div>
            </div>
          )
        : null}

      {listing.isLoading ? (listing.viewMode === 'grid' ? renderGridSkeleton() : renderListSkeleton(pageConfig.tableColumns.length)) : null}

      {!listing.isLoading && listing.isError
        ? (
            <Card className="border-red-500/30 bg-red-500/5">
              <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                <p className="text-lg font-semibold text-red-100">Failed to load records</p>
                <p className="text-sm text-red-200/80">Use search text "error" to verify this state.</p>
                <Button variant="outline" onClick={listing.retry}>Retry</Button>
              </CardContent>
            </Card>
          )
        : null}

      {!listing.isLoading && !listing.isError && records.length === 0
        ? (
            <Card className="border-neutral-800 bg-neutral-900/60">
              <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
                <p className="text-lg font-semibold text-neutral-100">No records found</p>
                <p className="text-sm text-neutral-400">Adjust search or filter selections to see more results.</p>
              </CardContent>
            </Card>
          )
        : null}

      {!listing.isLoading && !listing.isError && records.length > 0
        ? (
            <Card className="border-neutral-800 bg-neutral-900/60">
              <CardHeader>
                <CardTitle>{pageConfig.tableTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {listing.config.supportsImageView && listing.viewMode === 'grid'
                  ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{records.map(renderGridCard)}</div>
                  : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            {pageConfig.tableColumns.map(column => (
                              <TableHead key={column}>{column}</TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {records.map(record => (
                            <TableRow key={record.id} className="border-neutral-800">
                              <TableCell>
                                <div>
                                  <p className="font-medium text-neutral-100">{record.title}</p>
                                  <p className="text-xs text-neutral-400">{record.subtitle}</p>
                                </div>
                              </TableCell>
                              {record.tableValues.map(value => (
                                <TableCell key={`${record.id}-${value}`}>
                                  {value === 'active' || value === 'inactive' || value === 'pending'
                                    ? <Badge variant={statusToBadgeVariant(value)}>{toReadableStatus(value)}</Badge>
                                    : value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}

                <AdminModulePagination
                  currentPage={listing.page}
                  pageSize={listing.pageSize}
                  total={listing.data?.total ?? 0}
                  onChange={listing.onPageChange}
                />
              </CardContent>
            </Card>
          )
        : null}
    </div>
  );
};
