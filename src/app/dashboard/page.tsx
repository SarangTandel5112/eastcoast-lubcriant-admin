import { PageHeader, TablePlaceholder } from '@/modules/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/modules/common';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Overview of key admin metrics and recent activity."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {['Active Orders', 'Inventory Alerts', 'Pending Approvals'].map(title => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-gray-900">—</div>
              <p className="text-xs text-gray-500">Placeholder metric</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <TablePlaceholder
        title="Recent Orders"
        columns={['Order', 'Dealer', 'Status', 'Total', 'Date']}
      />
    </div>
  );
}
