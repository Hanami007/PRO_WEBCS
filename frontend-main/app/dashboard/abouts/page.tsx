import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardAbout from "./_components/dashboard-about";
import { getAboutSectionsQueryOptions } from "@/features/abouts/api/get-about-sections";

export const metadata = {
  title: "About Us Management",
  description: "Manage website sections and content blocks.",
};

const DashboardAboutPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getAboutSectionsQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardAbout />
    </HydrationBoundary>
  );
};

export default DashboardAboutPage;
