import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { PaginatedParams, Meta } from "@/types/api";
import { Article } from "../types/api";

export const getArticles = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Article[];
  meta: Meta;
}> => {
  return api.get("/articles", {
    params,
  });
};

export const getArticlesQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["articles", params],
    queryFn: () => getArticles(params),
  });
};

type UseArticlesOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getArticlesQueryOptions>;
};

export const useArticles = ({
  queryConfig,
  ...params
}: UseArticlesOptions = {}) => {
  return useQuery({
    ...getArticlesQueryOptions(params),
    ...queryConfig,
  });
};
