import z from "zod";
import {
  Announcement,
  AnnouncementStatus,
  AnnouncementType,
} from "../types/api";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnnouncementsQueryOptions } from "./get-announcements";

export const createAnnouncementInputSchema = z.object({
  title: z.string().min(5, "Required"),
  description: z.string().optional(),
  link: z.string().optional(),
  linkLabel: z.string().optional(),
  type: z.enum(AnnouncementType),
  status: z.enum(AnnouncementStatus),
  publishedAt: z.date(),
  expiresAt: z.date(),
});

export type CreateAnnouncementInput = z.infer<
  typeof createAnnouncementInputSchema
>;

export const createAnnouncement = ({
  data,
}: {
  data: CreateAnnouncementInput;
}): Promise<Announcement> => {
  return api.post(`/announcements`, data);
};

type UseCreateAnnouncementOptions = {
  mutationConfig?: MutationConfig<typeof createAnnouncement>;
};

export const useCreateAnnouncement = ({
  mutationConfig,
}: UseCreateAnnouncementOptions = {}) => {
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
    mutationFn: createAnnouncement,
  });
};
