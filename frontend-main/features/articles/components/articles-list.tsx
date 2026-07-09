"use client";

import { useArticles } from "../api/get-articles";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { QueryPagination } from "@/components/query-pagination";
import { QuerySearch } from "@/components/query-search";
import { ArticleCard } from "./article-card";
import { ArticleEmpty } from "./article-empty";
import { QueryLimit } from "@/components/query-limit";
import { SectionHeader } from "@/components/ui/section-header";

const ArticlesList = ({ limit: propLimit }: { limit?: number }) => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const searchTerm = searchParams.get("search") || "";
  const limit = propLimit || Number(searchParams.get("limit") || 12);

  const articlesQuery = useArticles({
    page: page,
    limit: limit,
    search: searchTerm,
  });

  if (articlesQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const articles = articlesQuery?.data?.data;
  const meta = articlesQuery?.data?.meta;

  if (!articles || !meta) return <ArticleEmpty />;

  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
        <SectionHeader
          subtitle=""
          title="Articles Search"
          className="w-full lg:w-auto"
        />

        <div className="flex flex-col items-end gap-4 w-full max-w-md">
          <QuerySearch
            placeholder="Search by code, title, or authors..."
            className="w-full"
          />
          <QueryLimit />
        </div>
      </div>

      {articles?.length === 0 ? (
        <ArticleEmpty />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {articles?.map((article) => {
            return <ArticleCard article={article} key={article.id} />;
          })}
        </div>
      )}

      {meta && meta.totalPages > 1 && <QueryPagination meta={meta} />}
    </div>
  );
};

export default ArticlesList;
