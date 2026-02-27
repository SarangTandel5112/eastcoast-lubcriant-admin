'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge, buttonVariants, Card, CardContent, CardHeader, CardTitle, cn, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

type PromotionRecord = {
  code: string;
  type: string;
  status: string;
  dates: string;
  image: string;
};

const PROMOTION_ROWS: PromotionRecord[] = [
  { code: 'WINTER10', type: 'Percent', status: 'Active', dates: '2026-01-01 to 2026-03-31', image: 'https://picsum.photos/seed/promo-1/640/480' },
  { code: 'BULK50', type: 'Flat', status: 'Pending', dates: '2026-02-01 to 2026-02-28', image: 'https://picsum.photos/seed/promo-2/640/480' },
  { code: 'DEALER8', type: 'Percent', status: 'Active', dates: '2026-01-15 to 2026-04-15', image: 'https://picsum.photos/seed/promo-3/640/480' },
];

export const PromotionsModulePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge>Promotions workspace</Badge>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-50 md:text-4xl">Promotions</h2>
            <p className="mt-2 text-sm text-neutral-300 md:text-base">Independent promotion module with dedicated campaign card and list modes.</p>
          </div>
          <div className="inline-flex rounded-md border border-neutral-800 bg-neutral-950 p-1">
            <button type="button" className={cn(buttonVariants({ size: 'sm', variant: viewMode === 'grid' ? 'default' : 'ghost' }))} onClick={() => setViewMode('grid')}>Grid</button>
            <button type="button" className={cn(buttonVariants({ size: 'sm', variant: viewMode === 'list' ? 'default' : 'ghost' }))} onClick={() => setViewMode('list')}>List</button>
          </div>
        </div>
      </section>

      {viewMode === 'grid'
        ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {PROMOTION_ROWS.map(row => (
                <Card key={row.code} className="overflow-hidden border-neutral-800 bg-neutral-900/60">
                  <div className="relative aspect-[16/10] border-b border-neutral-800">
                    <Image src={row.image} alt={row.code} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                  </div>
                  <CardContent className="space-y-2 p-4">
                    <p className="text-base font-semibold text-neutral-100">{row.code}</p>
                    <p className="text-sm text-neutral-300">{row.type}</p>
                    <p className="text-xs text-neutral-400">
                      {row.status}
                      {' '}
                      •
                      {' '}
                      {row.dates}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        : (
            <Card className="border-neutral-800 bg-neutral-900/60">
              <CardHeader>
                <CardTitle>Promotion list</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Active dates</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PROMOTION_ROWS.map(row => (
                      <TableRow key={`${row.code}-table`} className="border-neutral-800">
                        <TableCell>{row.code}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.dates}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
    </div>
  );
};
