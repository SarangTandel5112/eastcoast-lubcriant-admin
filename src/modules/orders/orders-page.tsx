'use client';

import { Badge, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

const ORDER_ROWS = [
  { order: 'ORD-3004', dealer: 'Dealer 11', status: 'Pending', total: '$9,480', placed: '2026-01-24' },
  { order: 'ORD-3016', dealer: 'Dealer 07', status: 'Active', total: '$14,210', placed: '2026-01-23' },
  { order: 'ORD-3033', dealer: 'Dealer 28', status: 'Inactive', total: '$5,930', placed: '2026-01-22' },
];

export const OrdersModulePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <Badge>Orders workspace</Badge>
        <h2 className="mt-3 text-3xl font-semibold text-neutral-50 md:text-4xl">Orders</h2>
        <p className="mt-2 text-sm text-neutral-300 md:text-base">Independent module for order lifecycle, totals, and status controls.</p>
      </section>
      <Card className="border-neutral-800 bg-neutral-900/60">
        <CardHeader>
          <CardTitle>Order list</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Dealer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Placed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDER_ROWS.map(row => (
                <TableRow key={row.order} className="border-neutral-800">
                  <TableCell>{row.order}</TableCell>
                  <TableCell>{row.dealer}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.placed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
