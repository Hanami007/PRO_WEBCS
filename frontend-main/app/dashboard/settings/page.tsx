import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProjectsQueryOptions } from "@/features/projects/api/get-projects";
import DashboardSettings from "./_components/dashboard-settings";

const DashboardSettingsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getProjectsQueryOptions({ page: 1, limit: 10 }),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardSettings />
    </HydrationBoundary>
  );
};

export default DashboardSettingsPage;
