import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Meta, PaginatedParams } from "@/types/api";
import { AboutContent } from "../types/api";
import { QueryConfig } from "@/lib/react-query";

export const getAboutContents = (
  params: PaginatedParams = {}
): Promise<{
  data: AboutContent[];
  meta: Meta;
}> => {
  return api.get(`/about-contents`, { params });
};

export const getAboutContentsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["about-contents", params],
    queryFn: () => getAboutContents(params),
  });
};

type UseAboutContentsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getAboutContentsQueryOptions>;
};

export const useAboutContents = ({
  queryConfig,
  ...params
}: UseAboutContentsOptions = {}) => {
  return useQuery({
    ...getAboutContentsQueryOptions(params),
    ...queryConfig,
  });
};
