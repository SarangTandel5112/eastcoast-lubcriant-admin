import type { ProductViewMode } from './types';
import { Card, CardContent } from '@/modules/common';

export const ProductSkeleton = (props: {
  view: ProductViewMode;
}) => {
  if (props.view === 'list') {
    return (
      <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-4">
        <div className="space-y-3">
          {Array.from({ length: 8 }, (_, index) => `row-${index + 1}`).map(rowId => (
            <div key={rowId} className="grid grid-cols-9 gap-3">
              {Array.from({ length: 9 }, (_, index) => `col-${rowId}-${index + 1}`).map(colId => (
                <div key={colId} className="h-8 animate-pulse rounded bg-neutral-800" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => `card-${index + 1}`).map(cardId => (
        <Card key={cardId} className="border-neutral-800 bg-neutral-900/60">
          <div className="h-40 animate-pulse bg-neutral-800" />
          <CardContent className="space-y-3">
            <div className="h-4 animate-pulse rounded bg-neutral-800" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-800" />
            <div className="h-8 animate-pulse rounded bg-neutral-800" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
