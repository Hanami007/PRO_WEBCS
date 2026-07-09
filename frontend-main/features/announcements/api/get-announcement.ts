import { api } from "@/lib/api-client";
import { Announcement } from "../types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

export const getAnnouncement = ({
  announcementId,
}: {
  announcementId: string;
}): Promise<Announcement> => {
  return api.get(`/announcements/${announcementId}`);
};

export const getAnnouncementQueryOptions = (announcementId: string) => {
  return queryOptions({
    queryKey: ["announcements", announcementId],
    queryFn: () => getAnnouncement({ announcementId }),
  });
};

type UseAnnouncementOptions = {
  announcementId: string;
  queryConfig?: QueryConfig<typeof getAnnouncementQueryOptions>;
};

export const useAnnouncement = ({
  announcementId,
  queryConfig,
}: UseAnnouncementOptions) => {
  return useQuery({
    ...getAnnouncementQueryOptions(announcementId),
    ...queryConfig,
  });
};
