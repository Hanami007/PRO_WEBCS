import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { Article } from "./_components/article";
import {
  getArticle,
  getArticleQueryOption,
} from "@/features/articles/api/get-article";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) => {
  const articleId = (await params).articleId;
  const article = await getArticle({ articleId });

  return {
    title: article?.title,
    description: article?.content,
  };
};

const preloadData = async (articleId: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getArticleQueryOption(articleId));

  return {
    dehydratedState: dehydrate(queryClient),
    queryClient,
  };
};

const ArticlePage = async ({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) => {
  const articleId = (await params).articleId;

  const { dehydratedState, queryClient } = await preloadData(articleId);

  const article = queryClient.getQueryData(
    getArticleQueryOption(articleId).queryKey,
  );

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <Article articleId={articleId} />
    </HydrationBoundary>
  );
};

export default ArticlePage;
