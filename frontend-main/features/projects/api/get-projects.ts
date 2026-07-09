import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Project } from "../types/api";
import { Meta, PaginatedParams } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";

export const getProjects = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Project[];
  meta: Meta;
}> => {
  return api.get("/projects", { params });
};

export const getProjectsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
  });
};

type UseProjectsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getProjectsQueryOptions>;
};

export const useProjects = ({
  queryConfig,
  ...params
}: UseProjectsOptions = {}) => {
  return useQuery({
    ...getProjectsQueryOptions(params),
    ...queryConfig,
  });
};
