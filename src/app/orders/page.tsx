import { PageHeader, TablePlaceholder } from '@/modules/admin';

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Orders"
        description="Monitor order lifecycle, payments, and delivery status."
        actionLabel="Create order"
      />
      <TablePlaceholder
        title="Order List"
        columns={['Order', 'Dealer', 'Status', 'Total', 'Placed']}
      />
    </div>
  );
}
