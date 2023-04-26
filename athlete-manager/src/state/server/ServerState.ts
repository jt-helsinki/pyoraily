/*
 *
 * MIT License.
 *
 */
import { QueryClient } from '@tanstack/react-query';

export const ServerState = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours (ms * seconds * minutes * hours)
      staleTime: 1000 * 60 * 60 * 1, // 1 hour (ms * seconds * minutes * hours)
    },
  },
});
