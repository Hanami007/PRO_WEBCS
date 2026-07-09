import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Meta, PaginatedParams } from "@/types/api";
import { Event } from "../types/api";
import { QueryConfig } from "@/lib/react-query";

export const getEvents = (
  params: PaginatedParams = {
    page: 1,
    limit: 100, 
    search: "",
    sortBy: "startsAt:ASC",
  }
): Promise<{
  data: Event[];
  meta: Meta;
}> => {
  return api.get(`/events`, { params });
};

export const getEventsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["events", params],
    queryFn: () => getEvents(params),
  });
};

type UseEventsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getEventsQueryOptions>;
};

export const useEvents = ({
  queryConfig,
  ...params
}: UseEventsOptions = {}) => {
  return useQuery({
    ...getEventsQueryOptions(params),
    ...queryConfig,
  });
};
