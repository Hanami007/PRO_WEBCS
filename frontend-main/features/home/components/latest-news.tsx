"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useArticles } from "@/features/articles/api/get-articles";
import { paths } from "@/config/paths";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

const LatestNews: React.FC = () => {
  const articlesQuery = useArticles({ page: 1, limit: 4 });

  const articles = articlesQuery?.data?.data;

  if (!articles || articles.length === 0) return null;

  return (
    <div className="max-w-384 mx-auto py-16 md:py-32">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl lg:text-4xl font-semibold">ข่าวสารล่าสุด</h2>
        </div>
        <Button
          variant="outline"
          className="text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-white"
          asChild
        >
          <Link href={paths.news.getHref()}>ดูทั้งหมด</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article) => {
          const thumbnail = article.thumbnail?.url || "/cs-logo.svg";

          return (
            <Link
              key={article.id}
              href={paths.news.article.getHref(article.id)}
              passHref
            >
              <Card className="relative mx-auto w-full overflow-hidden pt-0">
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={thumbnail}
                    alt={"Article cover"}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 384px"
                    priority
                  />
                </div>

                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-snug dark:text-white ">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-white">
                    <span className="rounded">{article.category}</span>
                    <span>
                      {formatDate(String(article.createdAt), "th-TH")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LatestNews;
