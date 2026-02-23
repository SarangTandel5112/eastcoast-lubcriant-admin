import { PageHeader, TablePlaceholder } from '@/modules/admin';

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Products"
        description="Manage catalog items, variants, and lifecycle status."
        actionLabel="Add product"
      />
      <TablePlaceholder
        title="Product List"
        columns={['Product', 'Brand', 'Category', 'Status', 'Updated']}
      />
    </div>
  );
}
