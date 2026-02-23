import { PageHeader, TablePlaceholder } from '@/modules/admin';

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Inventory"
        description="Track stock levels, reserved quantities, and movements."
        actionLabel="Record adjustment"
      />
      <TablePlaceholder
        title="Inventory Snapshot"
        columns={['SKU', 'Variant', 'Stock', 'Reserved', 'Updated']}
      />
    </div>
  );
}
