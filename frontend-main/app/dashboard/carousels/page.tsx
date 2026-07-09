import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCarouselsQueryOptions } from "@/features/carousels/api/get-carousels";
import DashboardCarousels from "./_components/dashboard-carousels";

export const metadata = {
  title: "Carousels Management",
  description: "Manage your homepage slider images.",
};

const DashboardCarouselsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getCarouselsQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardCarousels />
    </HydrationBoundary>
  );
};

export default DashboardCarouselsPage;
