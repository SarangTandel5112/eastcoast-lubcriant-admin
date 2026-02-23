'use client';

import { useEffect } from 'react';

export default function RootError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root error:', props.error);
  }, [props.error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 text-neutral-100">
      <h2 className="text-2xl font-bold">Application error</h2>
      <button
        type="button"
        onClick={props.reset}
        className="rounded-lg bg-neutral-800 px-4 py-2 text-neutral-100 hover:bg-neutral-700"
      >
        Reload application
      </button>
    </div>
  );
}
