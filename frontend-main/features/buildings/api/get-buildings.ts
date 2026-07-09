import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Building } from "@/features/buildings/types/api";
import { Meta, PaginatedParams } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";

export const getBuildings = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Building[];
  meta: Meta;
}> => {
  return api.get(`/buildings`, { params });
};

export const getBuildingsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["buildings", params],
    queryFn: () => getBuildings(params),
  });
};

type UseBuildingsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getBuildingsQueryOptions>;
};

export const useBuildings = ({
  queryConfig,
  ...params
}: UseBuildingsOptions = {}) => {
  return useQuery({ ...getBuildingsQueryOptions(params), ...queryConfig });
};
