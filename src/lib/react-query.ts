import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 0,
      refetchOnWindowFocus: false,
      retry: (failureCount, error: unknown) => {
        if (error && typeof error === "object" && "response" in error) {
          const errorWithResponse = error as { response: { status: number } };
          if (
            errorWithResponse.response?.status >= 400 &&
            errorWithResponse.response?.status < 500
          ) {
            return false;
          }
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});
