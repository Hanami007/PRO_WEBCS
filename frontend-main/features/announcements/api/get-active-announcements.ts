import { Announcement } from "../types/api";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

export const getActiveAnnouncements = (): Promise<Announcement[]> => {
  return api.get("/announcements/active");
};

export const getActiveAnnouncementsQueryOptions = () => {
  return queryOptions({
    queryKey: ["announcements", "active"],
    queryFn: () => getActiveAnnouncements(),
  });
};

type UseAnnouncementsOptions = {
  queryConfig?: QueryConfig<typeof getActiveAnnouncementsQueryOptions>;
};

export const useActiveAnnouncements = ({
  queryConfig,
}: UseAnnouncementsOptions = {}) => {
  return useQuery({
    ...getActiveAnnouncementsQueryOptions(),
    ...queryConfig,
  });
};
