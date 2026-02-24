import type { ProductViewMode } from './types';
import { Button } from '@/modules/common';

export const ProductViewToggle = (props: {
  view: ProductViewMode;
  onChange: (view: ProductViewMode) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={props.view === 'grid' ? 'default' : 'outline'}
        onClick={() => props.onChange('grid')}
      >
        Grid view
      </Button>
      <Button
        size="sm"
        variant={props.view === 'list' ? 'default' : 'outline'}
        onClick={() => props.onChange('list')}
      >
        List view
      </Button>
    </div>
  );
};
