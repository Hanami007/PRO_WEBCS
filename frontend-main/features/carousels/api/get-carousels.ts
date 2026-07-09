import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Meta, PaginatedParams } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";
import { Carousel } from "../types/api";

export const getCarousels = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Carousel[];
  meta: Meta;
}> => {
  return api.get(`/carousels`, { params });
};

export const getCarouselsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["carousels", params],
    queryFn: () => getCarousels(params),
  });
};

type UseCarouselsOption = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getCarouselsQueryOptions>;
};

export const useCarousels = ({
  queryConfig,
  ...params
}: UseCarouselsOption = {}) => {
  return useQuery({ ...getCarouselsQueryOptions(params), ...queryConfig });
};
