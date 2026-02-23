import { PageHeader, TablePlaceholder } from '@/modules/admin';

export default function AiLogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AI Logs"
        description="Review AI call summaries, statuses, and transcripts."
      />
      <TablePlaceholder
        title="AI Call History"
        columns={['Dealer', 'Status', 'Summary', 'Duration', 'Created']}
      />
    </div>
  );
}
