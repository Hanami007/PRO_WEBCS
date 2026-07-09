import z from "zod";
import {
  Announcement,
  AnnouncementStatus,
  AnnouncementType,
} from "../types/api";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnnouncementQueryOptions } from "./get-announcement";

export const updateAnnouncementInputSchema = z.object({
  title: z.string().min(5, "Required"),
  description: z.string().optional(),
  link: z.string().optional(),
  linkLabel: z.string().optional(),
  type: z.enum(AnnouncementType),
  status: z.enum(AnnouncementStatus),
  publishedAt: z.date(),
  expiresAt: z.date(),
});

export type UpdateAnnouncementInput = z.infer<
  typeof updateAnnouncementInputSchema
>;

export const updateAnnouncement = ({
  data,
  announcementId,
}: {
  data: UpdateAnnouncementInput;
  announcementId: string;
}): Promise<Announcement> => {
  return api.patch(`/announcements/${announcementId}`, data);
};

type UseUpdateAnnouncementOptions = {
  mutationConfig?: MutationConfig<typeof updateAnnouncement>;
};

export const useUpdateAnnouncement = ({
  mutationConfig,
}: UseUpdateAnnouncementOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getAnnouncementQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateAnnouncement,
  });
};
