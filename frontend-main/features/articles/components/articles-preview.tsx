"use client";

import { useArticles } from "../api/get-articles";
import { Spinner } from "@/components/ui/spinner";
import { ArticleCard } from "./article-card";
import { ArticleEmpty } from "./article-empty";

const ArticlesPreview = ({ limit }: { limit?: number | 0 }) => {
  const articlesQuery = useArticles({
    page: 1,
    limit: limit,
  });

  if (articlesQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const articles = articlesQuery?.data?.data;

  if (!articles) return <ArticleEmpty />;

  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {articles?.map((article) => {
          return <ArticleCard article={article} key={article.id} />;
        })}
      </div>
    </div>
  );
};

export default ArticlesPreview;
