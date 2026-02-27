'use client';

import { Badge, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

const INVOICE_ROWS = [
  { invoice: 'INV-2006', order: 'ORD-3006', amount: '$6,720', status: 'Open', issued: '2026-01-21' },
  { invoice: 'INV-2011', order: 'ORD-3012', amount: '$11,490', status: 'Paid', issued: '2026-01-20' },
  { invoice: 'INV-2023', order: 'ORD-3027', amount: '$8,930', status: 'Partial', issued: '2026-01-19' },
];

export const InvoicesModulePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <Badge>Invoices workspace</Badge>
        <h2 className="mt-3 text-3xl font-semibold text-neutral-50 md:text-4xl">Invoices</h2>
        <p className="mt-2 text-sm text-neutral-300 md:text-base">Independent module for billing, invoice records, and payment status.</p>
      </section>
      <Card className="border-neutral-800 bg-neutral-900/60">
        <CardHeader>
          <CardTitle>Invoice list</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issued</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICE_ROWS.map(row => (
                <TableRow key={row.invoice} className="border-neutral-800">
                  <TableCell>{row.invoice}</TableCell>
                  <TableCell>{row.order}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.issued}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
