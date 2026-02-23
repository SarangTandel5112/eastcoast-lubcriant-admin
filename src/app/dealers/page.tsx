import { PageHeader, TablePlaceholder } from '@/modules/admin';

export default function DealersPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dealers"
        description="Manage dealer accounts and address records."
        actionLabel="Add dealer"
      />
      <TablePlaceholder
        title="Dealer List"
        columns={['Dealer', 'Contact', 'Status', 'Created']}
      />
    </div>
  );
}
