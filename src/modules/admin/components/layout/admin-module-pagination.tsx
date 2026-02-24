import { Button } from '@/modules/common';

export type AdminModulePaginationProps = {
  currentPage: number;
  pageSize: number;
  total: number;
  onChange: (nextPage: number) => void;
};

const buildPageNumbers = (currentPage: number, totalPages: number) => {
  const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);

  return Array.from(pages)
    .filter(page => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
};

export const AdminModulePagination = (props: AdminModulePaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(props.total / props.pageSize));
  const canPrev = props.currentPage > 1;
  const canNext = props.currentPage < totalPages;
  const pages = buildPageNumbers(props.currentPage, totalPages);

  return (
    <div className="flex flex-col gap-3 border-t border-neutral-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-neutral-400">
        Page
        {' '}
        {props.currentPage}
        {' '}
        of
        {' '}
        {totalPages}
      </p>
      <p className="text-sm text-neutral-400">
        Total results:
        {' '}
        {props.total}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!canPrev}
          onClick={() => props.onChange(props.currentPage - 1)}
        >
          Previous
        </Button>

        {pages.map(page => (
          <Button
            key={page}
            variant={page === props.currentPage ? 'default' : 'outline'}
            size="sm"
            onClick={() => props.onChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={!canNext}
          onClick={() => props.onChange(props.currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
