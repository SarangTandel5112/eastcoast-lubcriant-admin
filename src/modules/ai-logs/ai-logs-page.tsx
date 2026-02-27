'use client';

import { Badge, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

const AI_ROWS = [
  { dealer: 'Dealer 12', status: 'Success', summary: 'Follow-up on restock request', duration: '08 min', created: '2026-01-24' },
  { dealer: 'Dealer 03', status: 'Pending', summary: 'Bulk quote clarification', duration: '05 min', created: '2026-01-23' },
  { dealer: 'Dealer 27', status: 'Success', summary: 'Invoice discrepancy discussion', duration: '12 min', created: '2026-01-22' },
];

export const AiLogsModulePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <Badge>AI logs workspace</Badge>
        <h2 className="mt-3 text-3xl font-semibold text-neutral-50 md:text-4xl">AI logs</h2>
        <p className="mt-2 text-sm text-neutral-300 md:text-base">Independent module for AI call logs, summaries, and duration history.</p>
      </section>
      <Card className="border-neutral-800 bg-neutral-900/60">
        <CardHeader>
          <CardTitle>AI call history</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dealer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AI_ROWS.map(row => (
                <TableRow key={`${row.dealer}-${row.created}`} className="border-neutral-800">
                  <TableCell>{row.dealer}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.summary}</TableCell>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell>{row.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
