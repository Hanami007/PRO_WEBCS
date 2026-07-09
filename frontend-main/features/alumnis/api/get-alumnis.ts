import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Alumni } from "../types/api";
import { Meta, PaginatedParams } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";

export const getAlumnis = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Alumni[];
  meta: Meta;
}> => {
  return api.get("/alumnis", { params });
};

export const getAlumnisQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["alumnis", params],
    queryFn: () => getAlumnis(params),
  });
};

type UseAlumnisOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getAlumnisQueryOptions>;
};

export const useAlumnis = ({
  queryConfig,
  ...params
}: UseAlumnisOptions = {}) => {
  return useQuery({
    ...getAlumnisQueryOptions(params),
    ...queryConfig,
  });
};
