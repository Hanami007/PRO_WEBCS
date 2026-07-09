import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPersonnelsQueryOptions } from "@/features/personnels/api/get-personnels";
import DashboardPersonnel from "./_components/dashboard-personnel";

export const metadata = {
  title: "Personnel Management",
  description: "Manage lecturers and staff information.",
};

const DashboardPersonnelPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getPersonnelsQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardPersonnel />
    </HydrationBoundary>
  );
};

export default DashboardPersonnelPage;
