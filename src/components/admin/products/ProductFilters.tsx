import type { ProductFiltersState } from './types';
import { Input, Label } from '@/modules/common';

export const ProductFilters = (props: {
  searchValue: string;
  filters: ProductFiltersState;
  filterOptions: {
    brands: string[];
    productTypes: string[];
    categories: string[];
  };
  onSearchChange: (value: string) => void;
  onFilterChange: (key: keyof ProductFiltersState, value: string) => void;
}) => {
  return (
    <div className="grid gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 md:grid-cols-2 xl:grid-cols-5">
      <div className="space-y-2 xl:col-span-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search products, brand, category"
          value={props.searchValue}
          onChange={event => props.onSearchChange(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="brand-filter">Brand</Label>
        <select
          id="brand-filter"
          className="h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100"
          value={props.filters.brand}
          onChange={event => props.onFilterChange('brand', event.target.value)}
        >
          <option value="all">All brands</option>
          {props.filterOptions.brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type-filter">Product type</Label>
        <select
          id="type-filter"
          className="h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100"
          value={props.filters.productType}
          onChange={event => props.onFilterChange('productType', event.target.value)}
        >
          <option value="all">All types</option>
          {props.filterOptions.productTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-filter">Category</Label>
        <select
          id="category-filter"
          className="h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100"
          value={props.filters.category}
          onChange={event => props.onFilterChange('category', event.target.value)}
        >
          <option value="all">All categories</option>
          {props.filterOptions.categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status-filter">Status</Label>
        <select
          id="status-filter"
          className="h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100"
          value={props.filters.status}
          onChange={event => props.onFilterChange('status', event.target.value)}
        >
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};
