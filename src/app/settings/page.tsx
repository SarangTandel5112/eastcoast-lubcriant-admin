import { PageHeader, TablePlaceholder } from '@/modules/admin';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Configure admin preferences and platform defaults."
      />
      <TablePlaceholder
        title="Settings Overview"
        columns={['Section', 'Status', 'Last Updated']}
        rows={4}
      />
    </div>
  );
}
