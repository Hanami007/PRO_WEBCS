import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Meta, PaginatedParams } from "@/types/api";
import { Personnel } from "@/features/personnels/types/api";
import { QueryConfig } from "@/lib/react-query";

export const getPersonnels = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Personnel[];
  meta: Meta;
}> => {
  return api.get("/personnels", { params });
};

export const getPersonnelsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["personnels", params],
    queryFn: () => getPersonnels(params),
  });
};

type UsePersonnelsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getPersonnelsQueryOptions>;
};

export const usePersonnels = ({
  queryConfig,
  ...params
}: UsePersonnelsOptions = {}) => {
  return useQuery({
    ...getPersonnelsQueryOptions(params),
    ...queryConfig,
  });
};
