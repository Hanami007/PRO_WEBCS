import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { PaginatedParams, Meta } from "@/types/api";
import { Resource } from "../types/api";

export const getResources = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Resource[];
  meta: Meta;
}> => {
  return api.get("/resources", {
    params,
  });
};

export const getResourcesQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["resources", params],
    queryFn: () => getResources(params),
  });
};

type UseResourcesOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getResourcesQueryOptions>;
};

export const useResources = ({
  queryConfig,
  ...params
}: UseResourcesOptions = {}) => {
  return useQuery({
    ...getResourcesQueryOptions(params),
    ...queryConfig,
  });
};
