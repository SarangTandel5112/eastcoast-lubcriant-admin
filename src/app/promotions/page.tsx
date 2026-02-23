import { PageHeader, TablePlaceholder } from '@/modules/admin';

export default function PromotionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Promotions"
        description="Configure discounts, coupons, and eligibility rules."
        actionLabel="New promotion"
      />
      <TablePlaceholder
        title="Promotion List"
        columns={['Code', 'Type', 'Status', 'Active Dates']}
      />
    </div>
  );
}
