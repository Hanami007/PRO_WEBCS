import { Meta, PaginatedParams } from "@/types/api";
import { Announcement } from "../types/api";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

export const getAnnouncements = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Announcement[];
  meta: Meta;
}> => {
  return api.get("/announcements", {
    params,
  });
};

export const getAnnouncementsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["announcements", params],
    queryFn: () => getAnnouncements(params),
  });
};

type UseAnnouncementsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getAnnouncementsQueryOptions>;
};

export const useAnnouncements = ({
  queryConfig,
  ...params
}: UseAnnouncementsOptions = {}) => {
  return useQuery({
    ...getAnnouncementsQueryOptions(params),
    ...queryConfig,
  });
};
