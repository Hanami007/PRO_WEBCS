import React from "react";
import DashboardArticles from "./_components/dashboard-articles";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getArticlesQueryOptions } from "@/features/articles/api/get-articles";

export const metadata = {
  title: "Articles",
  description: "Articles",
};

const DashboardArticlesPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getArticlesQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardArticles />
    </HydrationBoundary>
  );
};

export default DashboardArticlesPage;
