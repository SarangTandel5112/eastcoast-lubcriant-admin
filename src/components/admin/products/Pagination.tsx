import { Button } from '@/modules/common';

export const Pagination = (props: {
  currentPage: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}) => {
  const totalPages = Math.max(1, Math.ceil(props.total / props.pageSize));
  const start = Math.max(1, props.currentPage - 2);
  const end = Math.min(totalPages, props.currentPage + 2);
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
      <p className="text-sm text-neutral-400">
        Page
        {' '}
        <span className="font-semibold text-neutral-200">{props.currentPage}</span>
        {' '}
        of
        {' '}
        <span className="font-semibold text-neutral-200">{totalPages}</span>
        {' '}
        ·
        {' '}
        <span className="font-semibold text-neutral-200">{props.total}</span>
        {' '}
        results
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={props.currentPage <= 1}
          onClick={() => props.onChange(props.currentPage - 1)}
        >
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {pages.map(page => (
            <Button
              key={page}
              size="sm"
              variant={page === props.currentPage ? 'default' : 'outline'}
              onClick={() => props.onChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={props.currentPage >= totalPages}
          onClick={() => props.onChange(props.currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
