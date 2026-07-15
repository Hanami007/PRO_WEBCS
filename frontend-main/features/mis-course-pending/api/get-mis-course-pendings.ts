import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { PaginatedParams, Meta } from "@/types/api";
import { MisCoursePending } from "../types/api";

export const getMisCoursePendings = (
  params: PaginatedParams = { page: 1, limit: 10, search: "" },
): Promise<{ data: MisCoursePending[]; meta: Meta }> => {
  return api.get("/mis-course-pending", { params });
};

export const getMisCoursePendingsQueryOptions = (params: PaginatedParams = {}) =>
  queryOptions({
    queryKey: ["mis-course-pending", params],
    queryFn: () => getMisCoursePendings(params),
  });

type UseOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getMisCoursePendingsQueryOptions>;
};

export const useMisCoursePendings = ({ queryConfig, ...params }: UseOptions = {}) =>
  useQuery({ ...getMisCoursePendingsQueryOptions(params), ...queryConfig });
