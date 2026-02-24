import { Button } from '@/modules/common';

export const ProductErrorState = (props: {
  onRetry: () => void;
}) => {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-xl border border-red-500/30 bg-red-500/5 text-center">
      <p className="text-lg font-semibold text-red-300">Failed to load products</p>
      <p className="max-w-md text-sm text-neutral-300">
        There was an issue while loading the product list.
      </p>
      <Button onClick={props.onRetry}>Retry</Button>
    </div>
  );
};
