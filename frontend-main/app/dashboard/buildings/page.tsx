import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardBuildings from "./_components/dashboard-buildings";
import { getBuildingsQueryOptions } from "@/features/buildings/api/get-buildings";

export const metadata = {
  title: "Buildings Management",
  description: "Manage campus buildings and their status.",
};

const DashboardBuildingsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getBuildingsQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardBuildings />
    </HydrationBoundary>
  );
};

export default DashboardBuildingsPage;
