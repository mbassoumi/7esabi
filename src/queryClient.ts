import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 120, // 120 seconds
      cacheTime: 1000 * 120, // 120 seconds
      refetchOnMount: 'always',
      refetchOnWindowFocus: 'always',
      refetchOnReconnect: 'always',
      refetchInterval: 1000 * 120, // 120 seconds
      refetchIntervalInBackground: false,
      suspense: false,
      useErrorBoundary: (error: any) => {
        const status = error?.response?.status;
        return status && (status === 401 || status >= 500);
      },
    },
    mutations: {
      retry: 1,
    },
  },
});
