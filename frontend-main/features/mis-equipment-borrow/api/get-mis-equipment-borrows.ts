import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { PaginatedParams, Meta } from "@/types/api";
import { MisEquipmentBorrow } from "../types/api";

export const getMisEquipmentBorrows = (
  params: PaginatedParams = { page: 1, limit: 10 },
): Promise<{ data: MisEquipmentBorrow[]; meta: Meta }> => {
  return api.get("/mis-equipment-borrow", { params });
};

export const getMisEquipmentBorrowsQueryOptions = (params: PaginatedParams = {}) =>
  queryOptions({
    queryKey: ["mis-equipment-borrow", params],
    queryFn: () => getMisEquipmentBorrows(params),
  });

type UseOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getMisEquipmentBorrowsQueryOptions>;
};

export const useMisEquipmentBorrows = ({ queryConfig, ...params }: UseOptions = {}) =>
  useQuery({ ...getMisEquipmentBorrowsQueryOptions(params), ...queryConfig });
