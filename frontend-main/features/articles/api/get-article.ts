import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Article } from "../types/api";

export const getArticle = ({
  articleId,
}: {
  articleId: string;
}): Promise<Article> => {
  return api.get(`/articles/${articleId}`);
};
export const getArticleQueryOption = (articleId: string) => {
  return queryOptions({
    queryKey: ["articles", articleId],
    queryFn: () => getArticle({ articleId }),
  });
};

export const useArticle = (articleId: string) => {
  return useQuery(getArticleQueryOption(articleId));
};
