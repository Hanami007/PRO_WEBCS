import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import Newsroom from "./_components/newsroom";
import { getArticlesQueryOptions } from "@/features/articles/api/get-articles";
import { getEventsQueryOptions } from "@/features/events/api/get-events";

export const metadata = {
  title: "Newsroom",
  description: "A page showing latest news articles and events",
};

const NewsRoomPage = async () => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(getArticlesQueryOptions({ page: 1, limit: 4 })),
    queryClient.prefetchQuery(getEventsQueryOptions()),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Newsroom />
    </HydrationBoundary>
  );
};

export default NewsRoomPage;
