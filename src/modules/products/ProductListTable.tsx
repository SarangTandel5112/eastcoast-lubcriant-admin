import type { ProductListItem } from './types';
import Image from 'next/image';
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

export const ProductListTable = (props: {
  items: ProductListItem[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Variants</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.items.map(item => (
          <TableRow key={item.id}>
            <TableCell>
              <Image
                src={item.image}
                alt={item.name}
                width={56}
                height={40}
                sizes="56px"
                className="h-10 w-14 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium text-neutral-100">{item.name}</TableCell>
            <TableCell>{item.brand}</TableCell>
            <TableCell>{item.productType}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.variantCount}</TableCell>
            <TableCell>
              <Badge variant={item.isActive ? 'success' : 'muted'}>
                {item.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <Button size="sm" variant="outline">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
