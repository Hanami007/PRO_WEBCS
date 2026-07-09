import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { PaginatedParams, Meta } from "@/types/api";
import { Program } from "@/features/programs/types/api";

export const getPrograms = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  }
): Promise<{
  data: Program[];
  meta: Meta;
}> => {
  return api.get("/programs", {
    params,
  });
};

export const getProgramsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["programs", params],
    queryFn: () => getPrograms(params),
  });
};

type UseProgramsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getProgramsQueryOptions>;
};

export const usePrograms = ({
  queryConfig,
  ...params
}: UseProgramsOptions = {}) => {
  return useQuery({
    ...getProgramsQueryOptions(params),
    ...queryConfig,
  });
};