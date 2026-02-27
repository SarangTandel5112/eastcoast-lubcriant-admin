'use client';

import { Badge, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

const INVENTORY_ROWS = [
  { sku: 'SKU-10024', variant: '5W-30 4L', stock: '120', reserved: '14', updated: '2026-01-23' },
  { sku: 'SKU-10057', variant: '15W-40 20L', stock: '62', reserved: '8', updated: '2026-01-22' },
  { sku: 'SKU-10102', variant: 'ATF DEX III', stock: '39', reserved: '6', updated: '2026-01-21' },
];

export const InventoryModulePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <Badge>Inventory workspace</Badge>
        <h2 className="mt-3 text-3xl font-semibold text-neutral-50 md:text-4xl">Inventory</h2>
        <p className="mt-2 text-sm text-neutral-300 md:text-base">Independent module for stock visibility and reserved quantity tracking.</p>
      </section>
      <Card className="border-neutral-800 bg-neutral-900/60">
        <CardHeader>
          <CardTitle>Inventory snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Variant</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Reserved</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVENTORY_ROWS.map(row => (
                <TableRow key={row.sku} className="border-neutral-800">
                  <TableCell>{row.sku}</TableCell>
                  <TableCell>{row.variant}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>{row.reserved}</TableCell>
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
