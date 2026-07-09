import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardAlumnis from "./_components/dashboard-alumnis";
import { getAlumnisQueryOptions } from "@/features/alumnis/api/get-alumnis";

export const metadata = {
  title: "Alumni Management",
  description: "Manage alumni information.",
};

const DashboardAlumniPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getAlumnisQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardAlumnis />
    </HydrationBoundary>
  );
};

export default DashboardAlumniPage;
