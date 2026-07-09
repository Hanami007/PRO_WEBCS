"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { paths } from "@/config/paths";
import { Article } from "../types/api";

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const router = useRouter();

  const thumbnail = article.thumbnail?.url || "/cs-logo.svg";

  const handleViewEvent = () => {
    router.push(paths.news.article.getHref(article.id));
  };

  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
      {thumbnail && (
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
      )}

      <CardHeader>
        <CardAction>
          {article.category && (
            <Badge variant="secondary">{article.category}</Badge>
          )}
        </CardAction>
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {article.content}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button
          onClick={handleViewEvent}
          className="w-full"
          variant={"outline"}
        >
          Read Article
        </Button>
      </CardFooter>
    </Card>
  );
};
