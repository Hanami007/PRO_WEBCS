"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { useArticles } from "../../api/get-articles";
import { articleColumns } from "./dashboard-article-columns";

const DashboardArticlesList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const articlesQuery = useArticles({
    page: page,
    limit: limit,
    search: search,
  });

  if (articlesQuery.isPending && !articlesQuery.data) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const articles = articlesQuery?.data?.data || [];
  const meta = articlesQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={articleColumns}
        data={articles}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาหัวข้อข่าว..."
      />
    </div>
  );
};

export default DashboardArticlesList;
