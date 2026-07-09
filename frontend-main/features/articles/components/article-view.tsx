"use client";

import React from "react";
import { useArticle } from "../api/get-article";
import Image from "next/image";
import ArticleImages from "./article-images";
import { formatDate } from "@/lib/utils";
import { TextWrapper } from "@/components/text-wrapper";

const ArticleView = ({ articleId }: { articleId: string }) => {
  const articleQuery = useArticle(articleId);

  if (articleQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (articleQuery.isError) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <p>Error loading article.</p>
      </div>
    );
  }

  const article = articleQuery.data;

  if (!article) return null;

  return (
    <div>
      <div className="mx-auto p-6 space-y-6">
        <div className="mx-auto min-w-[45ch] max-w-[78ch] py-4 space-y-6">
          <p className="lead">{article.title}</p>
        </div>

        {article.thumbnail?.url && (
          <div className="relative h-320 max-h-[640px]">
            <Image
              src={article.thumbnail.url}
              fill={true}
              alt={article.title}
              className="rounded-md object-contain"
            />
          </div>
        )}

        <TextWrapper title={""}>
          <span>{article.content}</span>
        </TextWrapper>
        <ArticleImages images={article.contentImages} />

        <div className="mx-auto min-w-[45ch] max-w-[78ch] py-4 space-y-2">
          <div className="flex items-center">
            <span>วันที่เผยแพร่ : </span>
            <span>{formatDate(String(article.createdAt), "th-TH")}</span>
          </div>
          <div className="flex items-center">
            <span>ข่าวประเภท : </span>
            <span>{article.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
