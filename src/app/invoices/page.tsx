import { PageHeader, TablePlaceholder } from '@/modules/admin';

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Invoices"
        description="View invoice records, totals, and statuses."
        actionLabel="Generate invoice"
      />
      <TablePlaceholder
        title="Invoice List"
        columns={['Invoice', 'Order', 'Amount', 'Status', 'Issued']}
      />
    </div>
  );
}
