'use client';

import * as React from 'react';
import { Button } from '@/modules/common';

type ProductErrorBoundaryState = {
  hasError: boolean;
};

export class ProductErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ProductErrorBoundaryState
> {
  override state: ProductErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-xl border border-red-500/30 bg-red-500/5 text-center">
          <p className="text-lg font-semibold text-red-300">Failed to load products</p>
          <Button onClick={() => this.setState({ hasError: false })}>Retry</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
