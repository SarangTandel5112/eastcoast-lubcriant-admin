import type { AdminPageConfig, AdminPageId } from '../../types';
import Link from 'next/link';
import { Badge, buttonVariants, Card, CardContent, CardHeader, CardTitle, cn } from '@/modules/common';
import { ADMIN_NAVIGATION, ADMIN_PAGE_CONFIG } from '../../constants';
import { TablePlaceholder } from './table-placeholder';

export type AdminModulePageProps = {
  pageId: AdminPageId;
};

type ThemeConfig = {
  badgeClassName: string;
  gradientClassName: string;
};

const MODULE_THEME: Record<AdminPageId, ThemeConfig> = {
  'home': {
    badgeClassName: 'border-blue-500/30 bg-blue-500/10 text-blue-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.22),_transparent_46%),radial-gradient(circle_at_bottom_right,_rgba(8,145,178,0.15),_transparent_48%)]',
  },
  'dashboard': {
    badgeClassName: 'border-blue-500/30 bg-blue-500/10 text-blue-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_44%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.15),_transparent_50%)]',
  },
  'products': {
    badgeClassName: 'border-violet-500/30 bg-violet-500/10 text-violet-200',
    gradientClassName:
      'bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.2),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.12),_transparent_50%)]',
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

const toTitleCase = (value: string): string => {
  return value
    .split('-')
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
};

const buildFallbackMetrics = (config: AdminPageConfig) => {
  return config.tableColumns.slice(0, 3).map((column, index) => ({
    label: `${column} focus`,
    value: `${(index + 1) * 12}+`,
    note: `Preview metric for ${toTitleCase(config.id)} module`,
  }));
};

const buildHighlights = (config: AdminPageConfig): string[] => {
  return [
    `${toTitleCase(config.id)} workflow is ready for production data integration.`,
    `Use "${config.actionLabel ?? 'Open module controls'}" to start daily operations.`,
    `${config.tableColumns.length} table dimensions defined for ${config.tableTitle.toLowerCase()}.`,
  ];
};

const buildRelatedLinks = (pageId: AdminPageId) => {
  return ADMIN_NAVIGATION.filter(item => item.id !== pageId && item.id !== 'home').slice(0, 6);
};

export const AdminModulePage = (props: AdminModulePageProps) => {
  const config = ADMIN_PAGE_CONFIG[props.pageId];
  const metrics = config.metrics ?? buildFallbackMetrics(config);
  const relatedLinks = buildRelatedLinks(props.pageId);
  const moduleHighlights = buildHighlights(config);
  const theme = MODULE_THEME[props.pageId];

  return (
    <div className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <div className={cn('pointer-events-none absolute inset-0', theme.gradientClassName)} />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge className={theme.badgeClassName}>
              {config.title}
              {' '}
              Workspace
            </Badge>
            <h2 className="text-3xl leading-tight font-semibold text-neutral-50 md:text-4xl">
              {config.title}
            </h2>
            <p className="text-sm text-neutral-300 md:text-base">{config.description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {config.actionLabel
              ? (
                  <button className={cn(buttonVariants({ variant: 'default' }))} type="button">
                    {config.actionLabel}
                  </button>
                )
              : null}
            <Link href="/dashboard" className={cn(buttonVariants({ variant: 'outline' }))}>
              Back to dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map(metric => (
          <Card key={metric.label} className="border-neutral-800 bg-neutral-900/70">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-300">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-3xl font-semibold text-neutral-100">{metric.value}</p>
              <p className="mt-2 text-xs text-neutral-400">{metric.note}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <TablePlaceholder
          title={config.tableTitle}
          columns={config.tableColumns}
          rows={config.tableRows}
        />

        <div className="space-y-4">
          <Card className="border-neutral-800 bg-neutral-900/70">
            <CardHeader>
              <CardTitle>Module highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {moduleHighlights.map(highlight => (
                <div
                  key={highlight}
                  className="rounded-md border border-neutral-800 bg-neutral-950/70 p-3"
                >
                  <p className="text-sm text-neutral-300">{highlight}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-neutral-800 bg-neutral-900/70">
            <CardHeader>
              <CardTitle>Related modules</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {relatedLinks.map(link => (
                <Link
                  key={link.id}
                  href={link.path}
                  className="rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-200 transition hover:border-blue-500/40 hover:text-blue-200"
                >
                  {link.label}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
};
