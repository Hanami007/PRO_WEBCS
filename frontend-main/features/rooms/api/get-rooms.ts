import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Room } from "@/features/rooms/types/api";
import { Meta, PaginatedParams } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";

export const getRooms = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Room[];
  meta: Meta;
}> => {
  return api.get(`/rooms`, { params });
};

export const getRoomsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["rooms", params],
    queryFn: () => getRooms(params),
  });
};

type UseRoomsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getRoomsQueryOptions>;
};

export const useRooms = ({
  queryConfig,
  ...params
}: UseRoomsOptions) => {
  return useQuery({ ...getRoomsQueryOptions(params), ...queryConfig });
};
