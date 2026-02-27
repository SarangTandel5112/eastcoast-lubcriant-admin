'use client';

import { Badge, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

const DASHBOARD_ROWS = [
  { id: 'KP-1024', dealer: 'Dealer 12', status: 'Active', total: '$24,810', date: '2026-01-21' },
  { id: 'KP-1042', dealer: 'Dealer 31', status: 'Pending', total: '$11,430', date: '2026-01-23' },
  { id: 'KP-1056', dealer: 'Dealer 04', status: 'Inactive', total: '$8,760', date: '2026-01-25' },
];

export const DashboardModulePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <Badge>Dashboard workspace</Badge>
        <h2 className="mt-3 text-3xl font-semibold text-neutral-50 md:text-4xl">Dashboard</h2>
        <p className="mt-2 text-sm text-neutral-300 md:text-base">Independent dashboard module for KPI tracking and activity visibility.</p>
      </section>
      <Card className="border-neutral-800 bg-neutral-900/60">
        <CardHeader>
          <CardTitle>Recent orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Dealer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DASHBOARD_ROWS.map(row => (
                <TableRow key={row.id} className="border-neutral-800">
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.dealer}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
