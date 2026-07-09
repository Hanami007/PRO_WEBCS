import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";
import { Project } from "../types/api";

export const getProject = ({
  projectId,
}: {
  projectId: string;
}): Promise<Project> => {
  return api.get(`/projects/${projectId}`);
};

export const getProjectQueryOptions = (projectId: string) => {
  return queryOptions({
    queryKey: ["projects", projectId],
    queryFn: () => getProject({ projectId }),
  });
};

type UseProjectOptions = {
  projectId: string;
  queryConfig?: QueryConfig<typeof getProjectQueryOptions>;
};

export const useProject = ({ projectId, queryConfig }: UseProjectOptions) => {
  return useQuery({
    ...getProjectQueryOptions(projectId),
    ...queryConfig,
  });
};
