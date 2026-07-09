import { getUserQueryOptions } from "@/lib/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import DashboardAccount from "./_components/dashboard-account";

const DashboardAccountPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUserQueryOptions());
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardAccount />
    </HydrationBoundary>
  );
};

export default DashboardAccountPage;
