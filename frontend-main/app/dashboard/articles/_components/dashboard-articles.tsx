"use client";

import DashboardContentHeader from "@/components/dashboard-content-header";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { Separator } from "@/components/ui/separator";
import { CreateArticle } from "@/features/articles/components/dashboard/create-article";
import DashboardArticlesList from "@/features/articles/components/dashboard/dashboard-articles-list";
import React from "react";

const DashboardArticles = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Articles"
        description="Manage your department articles."
      >
        <CreateArticle />
      </DashboardContentHeader>
      <Separator />
      <DashboardArticlesList />
    </DashboardContentLayout>
  );
};

export default DashboardArticles;
