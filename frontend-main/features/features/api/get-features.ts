import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { PaginatedParams, Meta } from "@/types/api";
import { Feature } from "../types/api";

export const getFeatures = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
    filter: "",
  },
): Promise<{
  data: Feature[];
  meta: Meta;
}> => {
  return api.get("/features", {
    params,
  });
};

export const getFeaturesQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["features", params],
    queryFn: () => getFeatures(params),
  });
};

type UseFeaturesOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getFeaturesQueryOptions>;
};

export const useFeatures = ({
  queryConfig,
  ...params
}: UseFeaturesOptions = {}) => {
  return useQuery({
    ...getFeaturesQueryOptions(params),
    ...queryConfig,
  });
};
