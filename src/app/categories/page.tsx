import { PageHeader, TablePlaceholder } from '@/modules/admin';

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Categories"
        description="Organize product categories and hierarchical structure."
        actionLabel="Add category"
      />
      <TablePlaceholder
        title="Category List"
        columns={['Category', 'Parent', 'Products', 'Updated']}
      />
    </div>
  );
}
