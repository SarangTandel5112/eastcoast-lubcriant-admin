import type { ProductListItem } from './types';
import Image from 'next/image';
import { Badge, Button, Card, CardContent } from '@/modules/common';

export const ProductGridCard = (props: {
  product: ProductListItem;
}) => {
  const statusLabel = props.product.isActive ? 'Active' : 'Inactive';

  return (
    <Card className="overflow-hidden border-neutral-800 bg-neutral-900/70 transition hover:border-neutral-600">
      <Image
        src={props.product.image}
        alt={props.product.name}
        width={640}
        height={480}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        className="h-40 w-full object-cover"
      />
      <CardContent className="space-y-3">
        <div>
          <p className="text-base font-semibold text-neutral-100">{props.product.name}</p>
          <p className="text-sm text-neutral-400">
            {props.product.brand}
            {' · '}
            {props.product.category}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant={props.product.isActive ? 'success' : 'muted'}>{statusLabel}</Badge>
          <span className="text-xs text-neutral-400">
            {props.product.variantCount}
            {' variants'}
          </span>
        </div>

        <p className="text-sm text-neutral-300">
          $
          {props.product.priceMin}
          {' - $'}
          {props.product.priceMax}
        </p>

        <Button variant="outline" size="sm" className="w-full">
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};
