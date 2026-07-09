import { getArticlesQueryOptions } from "@/features/articles/api/get-articles";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { Articles } from "./_components/articles";

export const metadata = {
  title: "Articles",
  description: "Explore the latest news and articles from our department.",
};

type ArticlesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
};

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const { page, limit, search } = await searchParams;
  const queryClient = new QueryClient();

  const params = {
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 12,
    search: search || "",
  };

  await queryClient.prefetchQuery(getArticlesQueryOptions(params));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Articles />
    </HydrationBoundary>
  );
};

export default ArticlesPage;
