import { getProgramsQueryOptions } from "@/features/programs/api/get-programs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import DashboardPrograms from "./_components/dashboard-programs";

export const metadata = {
  title: "Programs",
  description: "Manage your department programs.",
};

const DashboardProgramsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getProgramsQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardPrograms />
    </HydrationBoundary>
  );
};

export default DashboardProgramsPage;
