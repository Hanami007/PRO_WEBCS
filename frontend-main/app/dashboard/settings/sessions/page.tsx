import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import DashboardSessions from "./_components/dashboard-sessions";
import { getSessionsQueryOptions } from "@/features/settings/api/get-sessions";

const SessionsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getSessionsQueryOptions());
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardSessions />
    </HydrationBoundary>
  );
};

export default SessionsPage;
