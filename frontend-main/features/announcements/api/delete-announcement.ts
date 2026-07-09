import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnnouncementsQueryOptions } from "./get-announcements";

export const deleteAnnouncement = ({
  announcementId,
}: {
  announcementId: string;
}) => {
  return api.delete(`/announcements/${announcementId}`);
};

type UseDeleteAnnouncementOptions = {
  mutationConfig?: MutationConfig<typeof deleteAnnouncement>;
};

export const useDeleteAnnouncement = ({
  mutationConfig,
}: UseDeleteAnnouncementOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAnnouncementsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteAnnouncement,
  });
};
