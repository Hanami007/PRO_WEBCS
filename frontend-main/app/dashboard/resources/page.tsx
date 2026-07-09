import React from "react";
import DashboardResources from "./_components/dashboard-resources";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getResourcesQueryOptions } from "@/features/resources/api/get-resources";

export const metadata = {
  title: "Resources Management",
  description: "Manage system links and configuration values.",
};

const DashboardResourcesPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getResourcesQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardResources />
    </HydrationBoundary>
  );
};

export default DashboardResourcesPage;
