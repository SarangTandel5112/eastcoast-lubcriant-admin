import type {
  AdminModuleFilterDefinition,
  AdminModuleListingConfig,
  AdminModuleListPageId,
  AdminModuleQueryOptions,
  AdminModuleQueryResult,
  AdminModuleRecord,
} from '../types';

const BASE_STATUS_OPTIONS = [
  { label: 'All status', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Inactive', value: 'inactive' },
] as const;

const toCreatedAt = (index: number) => {
  const date = new Date(Date.UTC(2026, 0, 1 + (index * 2)));
  return date.toISOString().slice(0, 10);
};

const buildRecords = (options: {
  moduleLabel: string;
  titlePrefix: string;
  subtitlePrefix: string;
  tableValueFactory: (index: number, status: AdminModuleRecord['status']) => string[];
  filterValueFactory: (index: number, status: AdminModuleRecord['status']) => Record<string, string>;
  count?: number;
  withImage?: boolean;
}) => {
  const count = options.count ?? 26;
  const statuses: AdminModuleRecord['status'][] = ['active', 'pending', 'inactive'];

  return Array.from({ length: count }, (_, index) => {
    const recordNumber = index + 1;
    const status = statuses[index % statuses.length] ?? 'active';

    return {
      id: `${options.moduleLabel.toLowerCase().replace(/\s+/g, '-')}-${recordNumber}`,
      title: `${options.titlePrefix} ${recordNumber}`,
      subtitle: `${options.subtitlePrefix} ${recordNumber}`,
      status,
      createdAt: toCreatedAt(index),
      primaryMetric: `${18 + ((recordNumber * 7) % 62)} items`,
      secondaryMetric: `Updated ${1 + (recordNumber % 7)}d ago`,
      imageUrl: options.withImage
        ? `https://picsum.photos/seed/${options.moduleLabel.toLowerCase()}-${recordNumber}/640/480`
        : undefined,
      tableValues: options.tableValueFactory(recordNumber, status),
      filterValues: options.filterValueFactory(recordNumber, status),
    } satisfies AdminModuleRecord;
  });
};

const DASHBOARD_FILTERS: AdminModuleFilterDefinition[] = [
  { key: 'status', label: 'Status', options: [...BASE_STATUS_OPTIONS] },
  {
    key: 'priority',
    label: 'Priority',
    options: [
      { label: 'All priorities', value: 'all' },
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ],
  },
];

const CATEGORY_FILTERS: AdminModuleFilterDefinition[] = [
  { key: 'status', label: 'Status', options: [...BASE_STATUS_OPTIONS] },
  {
    key: 'level',
    label: 'Level',
    options: [
      { label: 'All levels', value: 'all' },
      { label: 'Root', value: 'root' },
      { label: 'Child', value: 'child' },
    ],
  },
];

const BRAND_FILTERS: AdminModuleFilterDefinition[] = [
  { key: 'status', label: 'Status', options: [...BASE_STATUS_OPTIONS] },
  {
    key: 'region',
    label: 'Region',
    options: [
      { label: 'All regions', value: 'all' },
      { label: 'North', value: 'north' },
      { label: 'West', value: 'west' },
      { label: 'East', value: 'east' },
    ],
  },
];

const INVENTORY_FILTERS: AdminModuleFilterDefinition[] = [
  { key: 'status', label: 'Status', options: [...BASE_STATUS_OPTIONS] },
  {
    key: 'stockBand',
    label: 'Stock band',
    options: [
      { label: 'All bands', value: 'all' },
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
    ],
  },
];

const ORDER_FILTERS: AdminModuleFilterDefinition[] = [
  { key: 'status', label: 'Status', options: [...BASE_STATUS_OPTIONS] },
  {
    key: 'channel',
    label: 'Channel',
    options: [
      { label: 'All channels', value: 'all' },
      { label: 'Dealer portal', value: 'portal' },
      { label: 'Sales team', value: 'sales' },
    ],
  },
];

const DEALER_FILTERS: AdminModuleFilterDefinition[] = [
  { key: 'status', label: 'Status', options: [...BASE_STATUS_OPTIONS] },
  {
    key: 'province',
    label: 'Province',
    options: [
      { label: 'All provinces', value: 'all' },
      { label: 'Ontario', value: 'ontario' },
      { label: 'Quebec', value: 'quebec' },
      { label: 'Alberta', value: 'alberta' },
    ],
  },
];

const PROMOTION_FILTERS: AdminModuleFilterDefinition[] = [
  { key: 'status', label: 'Status', options: [...BASE_STATUS_OPTIONS] },
  {
    key: 'discountType',
    label: 'Discount type',
    options: [
      { label: 'All types', value: 'all' },
      { label: 'Percent', value: 'percent' },
      { label: 'Flat', value: 'flat' },
    ],
  },
];

const INVOICE_FILTERS: AdminModuleFilterDefinition[] = [
  { key: 'status', label: 'Status', options: [...BASE_STATUS_OPTIONS] },
  {
    key: 'paymentState',
    label: 'Payment',
    options: [
      { label: 'All states', value: 'all' },
      { label: 'Paid', value: 'paid' },
      { label: 'Partial', value: 'partial' },
      { label: 'Open', value: 'open' },
    ],
  },
];

const AI_LOG_FILTERS: AdminModuleFilterDefinition[] = [
  { key: 'status', label: 'Status', options: [...BASE_STATUS_OPTIONS] },
  {
    key: 'duration',
    label: 'Duration',
    options: [
      { label: 'All duration', value: 'all' },
      { label: 'Short', value: 'short' },
      { label: 'Medium', value: 'medium' },
      { label: 'Long', value: 'long' },
    ],
  },
];

const SETTINGS_FILTERS: AdminModuleFilterDefinition[] = [
  { key: 'status', label: 'Status', options: [...BASE_STATUS_OPTIONS] },
  {
    key: 'section',
    label: 'Section',
    options: [
      { label: 'All sections', value: 'all' },
      { label: 'Security', value: 'security' },
      { label: 'Billing', value: 'billing' },
      { label: 'Preferences', value: 'preferences' },
    ],
  },
];

export const ADMIN_MODULE_LISTING_CONFIG: Record<AdminModuleListPageId, AdminModuleListingConfig> = {
  'dashboard': {
    supportsImageView: false,
    filters: DASHBOARD_FILTERS,
    records: buildRecords({
      moduleLabel: 'dashboard',
      titlePrefix: 'KPI segment',
      subtitlePrefix: 'Board cluster',
      tableValueFactory: (index, _status) => [
        `KP-${1000 + index}`,
        `Dealer ${index}`,
        _status,
        `$${(index * 1130).toLocaleString('en-US')}`,
        toCreatedAt(index),
      ],
      filterValueFactory: (index, status) => ({
        status,
        priority: index % 3 === 0 ? 'high' : index % 3 === 1 ? 'medium' : 'low',
      }),
    }),
  },
  'categories': {
    supportsImageView: false,
    filters: CATEGORY_FILTERS,
    records: buildRecords({
      moduleLabel: 'categories',
      titlePrefix: 'Category',
      subtitlePrefix: 'Hierarchy node',
      tableValueFactory: (index, _status) => [
        `Category ${index}`,
        index % 4 === 0 ? 'Root' : `Parent ${Math.max(index - 1, 1)}`,
        `${16 + (index % 8)}`,
        toCreatedAt(index),
      ],
      filterValueFactory: (index, status) => ({
        status,
        level: index % 4 === 0 ? 'root' : 'child',
      }),
    }),
  },
  'brands': {
    supportsImageView: true,
    filters: BRAND_FILTERS,
    records: buildRecords({
      moduleLabel: 'brands',
      titlePrefix: 'Brand',
      subtitlePrefix: 'Portfolio line',
      withImage: true,
      tableValueFactory: index => [
        `Brand ${index}`,
        `Synthetic lubricant line ${index}`,
        toCreatedAt(index),
      ],
      filterValueFactory: (index, status) => ({
        status,
        region: index % 3 === 0 ? 'north' : index % 3 === 1 ? 'west' : 'east',
      }),
    }),
  },
  'inventory': {
    supportsImageView: false,
    filters: INVENTORY_FILTERS,
    records: buildRecords({
      moduleLabel: 'inventory',
      titlePrefix: 'SKU',
      subtitlePrefix: 'Warehouse zone',
      tableValueFactory: index => [
        `SKU-${10000 + index}`,
        `Variant ${index}`,
        `${55 + (index % 80)}`,
        `${10 + (index % 14)}`,
        toCreatedAt(index),
      ],
      filterValueFactory: (index, status) => ({
        status,
        stockBand: index % 3 === 0 ? 'low' : index % 3 === 1 ? 'medium' : 'high',
      }),
    }),
  },
  'orders': {
    supportsImageView: false,
    filters: ORDER_FILTERS,
    records: buildRecords({
      moduleLabel: 'orders',
      titlePrefix: 'Order',
      subtitlePrefix: 'Dealer account',
      tableValueFactory: (index, status) => [
        `ORD-${3000 + index}`,
        `Dealer ${index}`,
        status,
        `$${(index * 780).toLocaleString('en-US')}`,
        toCreatedAt(index),
      ],
      filterValueFactory: (index, status) => ({
        status,
        channel: index % 2 === 0 ? 'portal' : 'sales',
      }),
    }),
  },
  'dealers': {
    supportsImageView: true,
    filters: DEALER_FILTERS,
    records: buildRecords({
      moduleLabel: 'dealers',
      titlePrefix: 'Dealer',
      subtitlePrefix: 'Account owner',
      withImage: true,
      tableValueFactory: (index, status) => [
        `Dealer ${index}`,
        `Contact ${index}`,
        status,
        toCreatedAt(index),
      ],
      filterValueFactory: (index, status) => ({
        status,
        province: index % 3 === 0 ? 'ontario' : index % 3 === 1 ? 'quebec' : 'alberta',
      }),
    }),
  },
  'promotions': {
    supportsImageView: true,
    filters: PROMOTION_FILTERS,
    records: buildRecords({
      moduleLabel: 'promotions',
      titlePrefix: 'Promotion',
      subtitlePrefix: 'Campaign segment',
      withImage: true,
      tableValueFactory: (index, status) => [
        `PROMO-${100 + index}`,
        index % 2 === 0 ? 'Percent' : 'Flat',
        status,
        `${toCreatedAt(index)} to ${toCreatedAt(index + 12)}`,
      ],
      filterValueFactory: (index, status) => ({
        status,
        discountType: index % 2 === 0 ? 'percent' : 'flat',
      }),
    }),
  },
  'invoices': {
    supportsImageView: false,
    filters: INVOICE_FILTERS,
    records: buildRecords({
      moduleLabel: 'invoices',
      titlePrefix: 'Invoice',
      subtitlePrefix: 'Billing cycle',
      tableValueFactory: (index, status) => [
        `INV-${2000 + index}`,
        `ORD-${3000 + index}`,
        `$${(index * 845).toLocaleString('en-US')}`,
        status,
        toCreatedAt(index),
      ],
      filterValueFactory: (index, status) => ({
        status,
        paymentState: index % 3 === 0 ? 'paid' : index % 3 === 1 ? 'partial' : 'open',
      }),
    }),
  },
  'ai-logs': {
    supportsImageView: false,
    filters: AI_LOG_FILTERS,
    records: buildRecords({
      moduleLabel: 'ai-logs',
      titlePrefix: 'AI call',
      subtitlePrefix: 'Dealer interaction',
      tableValueFactory: (index, status) => [
        `Dealer ${index}`,
        status,
        `Call summary ${index}`,
        `${3 + (index % 18)} min`,
        toCreatedAt(index),
      ],
      filterValueFactory: (index, status) => ({
        status,
        duration: index % 3 === 0 ? 'short' : index % 3 === 1 ? 'medium' : 'long',
      }),
    }),
  },
  'settings': {
    supportsImageView: false,
    filters: SETTINGS_FILTERS,
    records: buildRecords({
      moduleLabel: 'settings',
      titlePrefix: 'Configuration',
      subtitlePrefix: 'Admin domain',
      count: 18,
      tableValueFactory: (index, status) => [
        index % 3 === 0 ? 'Security' : index % 3 === 1 ? 'Billing' : 'Preferences',
        status,
        toCreatedAt(index),
      ],
      filterValueFactory: (index, status) => ({
        status,
        section: index % 3 === 0 ? 'security' : index % 3 === 1 ? 'billing' : 'preferences',
      }),
    }),
  },
};

export const fetchAdminModuleRecords = async (options: {
  config: AdminModuleListingConfig;
  query: AdminModuleQueryOptions;
}): Promise<AdminModuleQueryResult> => {
  await new Promise(resolve => window.setTimeout(resolve, 340));

  if (options.query.search.toLowerCase() === 'error') {
    throw new Error('Failed to load module records');
  }

  const filtered = options.config.records.filter((record) => {
    const term = options.query.search.trim().toLowerCase();

    if (term) {
      const searchable = `${record.title} ${record.subtitle} ${record.tableValues.join(' ')}`.toLowerCase();
      if (!searchable.includes(term)) {
        return false;
      }
    }

    for (const [key, value] of Object.entries(options.query.filters)) {
      if (value === 'all') {
        continue;
      }

      if (record.filterValues[key] !== value) {
        return false;
      }
    }

    return true;
  });

  const start = (options.query.page - 1) * options.query.pageSize;
  const end = start + options.query.pageSize;

  return {
    items: filtered.slice(start, end),
    total: filtered.length,
    page: options.query.page,
    pageSize: options.query.pageSize,
  };
};
