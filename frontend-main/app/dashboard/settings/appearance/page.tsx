import { getUserQueryOptions } from "@/lib/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import DashboardAppearance from "./_components/dashboard-appearance";

const AppearancePage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUserQueryOptions());
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardAppearance />
    </HydrationBoundary>
  );
};

export default AppearancePage;
