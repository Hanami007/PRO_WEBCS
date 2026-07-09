import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { PaginatedParams, Meta } from "@/types/api";
import { Complain } from "../types/api";

export const getComplains = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Complain[];
  meta: Meta;
}> => {
  return api.get("/complains", {
    params,
  });
};

export const getComplainsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["complains", params],
    queryFn: () => getComplains(params),
  });
};

type UseComplainsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getComplainsQueryOptions>;
};

export const useComplains = ({
  queryConfig,
  ...params
}: UseComplainsOptions = {}) => {
  return useQuery({
    ...getComplainsQueryOptions(params),
    ...queryConfig,
  });
};
