import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getArticleQueryOption } from "@/features/articles/api/get-article";
import { DashboardArticle } from "./_components/dashboard-article";

type PageProps = {
  params: Promise<{ articleId: string }>;
};

export default async function ArticlePage({ params }: PageProps) {
  const { articleId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getArticleQueryOption(articleId));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardArticle articleId={articleId} />
    </HydrationBoundary>
  );
}