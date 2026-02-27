'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge, buttonVariants, Card, CardContent, CardHeader, CardTitle, cn, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

type DealerRecord = {
  name: string;
  contact: string;
  status: string;
  created: string;
  image: string;
};

const DEALER_ROWS: DealerRecord[] = [
  { name: 'North Auto Supply', contact: 'Jordan Green', status: 'Active', created: '2026-01-22', image: 'https://picsum.photos/seed/dealer-1/640/480' },
  { name: 'Metro Fleet Parts', contact: 'Anita Rao', status: 'Pending', created: '2026-01-19', image: 'https://picsum.photos/seed/dealer-2/640/480' },
  { name: 'West Industrial Lubes', contact: 'Liam Kent', status: 'Active', created: '2026-01-17', image: 'https://picsum.photos/seed/dealer-3/640/480' },
];

export const DealersModulePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge>Dealers workspace</Badge>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-50 md:text-4xl">Dealers</h2>
            <p className="mt-2 text-sm text-neutral-300 md:text-base">Independent dealer module with image card and list layouts.</p>
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
              {DEALER_ROWS.map(row => (
                <Card key={row.name} className="overflow-hidden border-neutral-800 bg-neutral-900/60">
                  <div className="relative aspect-[16/10] border-b border-neutral-800">
                    <Image src={row.image} alt={row.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                  </div>
                  <CardContent className="space-y-2 p-4">
                    <p className="text-base font-semibold text-neutral-100">{row.name}</p>
                    <p className="text-sm text-neutral-300">{row.contact}</p>
                    <p className="text-xs text-neutral-400">
                      {row.status}
                      {' '}
                      •
                      {' '}
                      {row.created}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        : (
            <Card className="border-neutral-800 bg-neutral-900/60">
              <CardHeader>
                <CardTitle>Dealer list</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dealer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {DEALER_ROWS.map(row => (
                      <TableRow key={`${row.name}-table`} className="border-neutral-800">
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.contact}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.created}</TableCell>
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
