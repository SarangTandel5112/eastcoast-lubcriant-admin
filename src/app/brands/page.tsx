import { PageHeader, TablePlaceholder } from '@/modules/admin';

export default function BrandsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Brands"
        description="Maintain brand information and positioning."
        actionLabel="Add brand"
      />
      <TablePlaceholder
        title="Brand List"
        columns={['Brand', 'Description', 'Created']}
      />
    </div>
  );
}
