"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import ArticlesList from "@/features/articles/components/articles-list";
import React from "react";

export const Articles = () => {
  return (
    <ContentLayout title="Latest News">
      <ArticlesList limit={12} />
    </ContentLayout>
  );
};
