"use client";

import { MainErrorFallback } from "@/components/errors/main";
import { Toaster } from "@/components/ui/sonner";
import { queryConfig } from "@/lib/react-query";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ApiError } from "@/lib/api-client";
import { NuqsAdapter } from "nuqs/adapters/next/app";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof ApiError && error.status === 401) {
              if (
                typeof window !== "undefined" &&
                window.location.pathname !== "/auth/login"
              ) {
                window.location.href = "/auth/login";
              }
            }
          },
        }),
        defaultOptions: queryConfig,
      }),
  );

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
          <Toaster />
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
