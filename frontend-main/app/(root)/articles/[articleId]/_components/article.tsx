"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import { useArticle } from "@/features/articles/api/get-article";
import ArticleView from "@/features/articles/components/article-view";
import { ErrorBoundary } from "react-error-boundary";

export const Article = ({ articleId }: { articleId: string }) => {
  const article = useArticle(articleId);
  return (
    <ContentLayout title={article?.data?.category}>
      <ErrorBoundary
        fallback={<div>Failed to load article. Try to refresh the page.</div>}
      >
        <ArticleView articleId={articleId} />
      </ErrorBoundary>
    </ContentLayout>
  );
};
