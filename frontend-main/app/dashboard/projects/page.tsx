import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardProjects from "./_components/dashboard-projects";
import { getProjectsQueryOptions } from "@/features/projects/api/get-projects";

export const metadata = {
  title: "Projects Management",
  description: "Manage student research projects and faculty publications.",
};

const DashboardProjectsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getProjectsQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardProjects />
    </HydrationBoundary>
  );
};

export default DashboardProjectsPage;
