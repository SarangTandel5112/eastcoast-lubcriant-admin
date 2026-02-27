'use client';

import { Badge, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

const SETTINGS_ROWS = [
  { section: 'Security', status: 'Configured', updated: '2026-01-19' },
  { section: 'Billing', status: 'Configured', updated: '2026-01-18' },
  { section: 'Preferences', status: 'Pending', updated: '2026-01-17' },
];

export const SettingsModulePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <Badge>Settings workspace</Badge>
        <h2 className="mt-3 text-3xl font-semibold text-neutral-50 md:text-4xl">Settings</h2>
        <p className="mt-2 text-sm text-neutral-300 md:text-base">Independent module for admin preferences and system defaults.</p>
      </section>
      <Card className="border-neutral-800 bg-neutral-900/60">
        <CardHeader>
          <CardTitle>Settings overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SETTINGS_ROWS.map(row => (
                <TableRow key={row.section} className="border-neutral-800">
                  <TableCell>{row.section}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
