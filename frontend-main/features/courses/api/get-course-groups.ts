import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { CourseGroup } from "@/features/courses/types/api";

export const getCourseGroups = (): Promise<CourseGroup[]> => {
  return api.get("/course-group");
};

export const getCourseGroupsQueryOptions = () => {
  return queryOptions({
    queryKey: ["course-group"],
    queryFn: getCourseGroups,
  });
};

type UseCourseGroupsOptions = {
  queryConfig?: QueryConfig<typeof getCourseGroupsQueryOptions>;
};

export const useCourseGroups = ({
  queryConfig,
}: UseCourseGroupsOptions = {}) => {
  return useQuery({
    ...getCourseGroupsQueryOptions(),
    ...queryConfig,
  });
};
