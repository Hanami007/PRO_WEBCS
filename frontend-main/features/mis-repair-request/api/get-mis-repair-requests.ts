import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { PaginatedParams, Meta } from "@/types/api";
import { MisRepairRequest } from "../types/api";

export const getMisRepairRequests = (
  params: PaginatedParams = { page: 1, limit: 10 },
): Promise<{ data: MisRepairRequest[]; meta: Meta }> => {
  return api.get("/mis-repair-request", { params });
};

export const getMisRepairRequestsQueryOptions = (params: PaginatedParams = {}) =>
  queryOptions({
    queryKey: ["mis-repair-request", params],
    queryFn: () => getMisRepairRequests(params),
  });

type UseOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getMisRepairRequestsQueryOptions>;
};

export const useMisRepairRequests = ({ queryConfig, ...params }: UseOptions = {}) =>
  useQuery({ ...getMisRepairRequestsQueryOptions(params), ...queryConfig });
