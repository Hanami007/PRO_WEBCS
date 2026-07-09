"use client";

import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import UpdateArticle from "@/features/articles/components/dashboard/update-article";
import { ErrorBoundary } from "react-error-boundary";

export const DashboardArticle = ({ articleId }: { articleId: string }) => {
  return (
    <DashboardContentLayout>
      <ErrorBoundary
        fallback={<div>Failed to load article. Try to refresh the page.</div>}
      >
        <UpdateArticle articleId={articleId} />
      </ErrorBoundary>
    </DashboardContentLayout>
  );
};
