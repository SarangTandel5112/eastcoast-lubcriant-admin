import { QueryClient } from '@tanstack/react-query';
import { APP_CONFIG } from '@/lib/app-config';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: APP_CONFIG.query.staleTimeMs,
        gcTime: APP_CONFIG.query.gcTimeMs,
        retry: APP_CONFIG.query.retry,
        refetchOnWindowFocus: APP_CONFIG.query.refetchOnWindowFocus,
      },
      mutations: {
        retry: 0,
      },
    },
  });
};
