import { z } from "zod";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventQueryOptions } from "./get-event";
import { Event } from "../types/api";

export const updateEventInputSchema = z.object({
  title: z.string().min(1, "Required").optional(),
  description: z.string().min(1, "Required").optional(),
  organizer: z.string().min(1, "Required").optional(),
  location: z.string().min(1, "Required").optional(),
  startsAt: z.string().min(1, "Required").optional(),
  endsAt: z.string().optional().nullable(),
  externalLink: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

export type UpdateEventInput = z.infer<typeof updateEventInputSchema>;

export const updateEvent = ({
  eventId,
  data,
}: {
  eventId: string;
  data: UpdateEventInput;
}): Promise<Event> => {
  return api.patch(`/events/${eventId}`, data);
};

type UseUpdateEventOptions = {
  mutationConfig?: MutationConfig<typeof updateEvent>;
};

export const useUpdateEvent = ({ mutationConfig }: UseUpdateEventOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getEventQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateEvent,
  });
};
