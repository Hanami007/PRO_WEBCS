import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { PaginatedParams, Meta } from "@/types/api";
import { Course } from "@/features/courses/types/api";

export const getCourses = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  }
): Promise<{
  data: Course[];
  meta: Meta;
}> => {
  return api.get("/courses", {
    params,
  });
};

export const getCoursesQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["courses", params],
    queryFn: () => getCourses(params),
  });
};

type UseCoursesOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getCoursesQueryOptions>;
};

export const useCourses = ({
  queryConfig,
  ...params
}: UseCoursesOptions = {}) => {
  return useQuery({
    ...getCoursesQueryOptions(params),
    ...queryConfig,
  });
};
