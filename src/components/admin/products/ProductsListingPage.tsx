'use client';

import { Button, Card, CardContent, CardHeader, CardTitle } from '@/modules/common';
import { Pagination } from './Pagination';
import { ProductEmptyState } from './ProductEmptyState';
import { ProductErrorBoundary } from './ProductErrorBoundary';
import { ProductErrorState } from './ProductErrorState';
import { ProductFilters } from './ProductFilters';
import { ProductGridCard } from './ProductGridCard';
import { ProductListTable } from './ProductListTable';
import { ProductSkeleton } from './ProductSkeleton';
import { ProductViewToggle } from './ProductViewToggle';
import { useProductsListing } from './use-products-listing';

export const ProductsListingPage = () => {
  const listing = useProductsListing();
  const items = listing.data?.items ?? [];
  const hasItems = items.length > 0;

  return (
    <ProductErrorBoundary>
      <div className="flex flex-col gap-6">
        <section className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.20),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(8,145,178,0.15),_transparent_48%)]" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                Product catalog
              </p>
              <h2 className="text-3xl leading-tight font-semibold text-neutral-50 md:text-4xl">
                Products
              </h2>
              <p className="text-sm text-neutral-300 md:text-base">
                Manage product inventory, variants, and visibility across your dealer network.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <ProductViewToggle view={listing.viewMode} onChange={listing.setViewMode} />
              <Button>Add product</Button>
            </div>
          </div>
        </section>

        <ProductFilters
          searchValue={listing.searchInput}
          filters={listing.filters}
          filterOptions={listing.filterOptions}
          onSearchChange={listing.setSearchInput}
          onFilterChange={listing.onFilterChange}
        />

        {listing.errorToastMessage
          ? (
              <div className="fixed top-4 right-4 z-50 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200 shadow-lg">
                <div className="flex items-center gap-3">
                  <span>{listing.errorToastMessage}</span>
                  <button
                    type="button"
                    onClick={listing.clearErrorToast}
                    className="text-red-200/80 hover:text-red-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            )
          : null}

        {listing.isLoading ? <ProductSkeleton view={listing.viewMode} /> : null}

        {!listing.isLoading && listing.isError ? <ProductErrorState onRetry={listing.retry} /> : null}

        {!listing.isLoading && !listing.isError && !hasItems ? <ProductEmptyState /> : null}

        {!listing.isLoading && !listing.isError && hasItems
          ? (
              <Card className="border-neutral-800 bg-neutral-900/60">
                <CardHeader>
                  <CardTitle>Product listing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {listing.viewMode === 'grid'
                    ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                          {items.map(product => (
                            <ProductGridCard key={product.id} product={product} />
                          ))}
                        </div>
                      )
                    : (
                        <ProductListTable items={items} />
                      )}

                  <Pagination
                    currentPage={listing.page}
                    pageSize={listing.pageSize}
                    total={listing.data?.total ?? 0}
                    onChange={listing.onPageChange}
                  />
                </CardContent>
              </Card>
            )
          : null}
      </div>
    </ProductErrorBoundary>
  );
};
