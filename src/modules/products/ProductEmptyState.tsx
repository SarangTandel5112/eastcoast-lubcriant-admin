import { Button } from '@/modules/common';

export const ProductEmptyState = () => {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/40 text-center">
      <div className="h-16 w-16 rounded-full border border-neutral-700 bg-neutral-900" />
      <p className="text-lg font-semibold text-neutral-100">No products found</p>
      <p className="max-w-md text-sm text-neutral-400">
        Try changing the search or filters to find matching products.
      </p>
      <Button>Add new product</Button>
    </div>
  );
};
