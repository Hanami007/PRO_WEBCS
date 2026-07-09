import { z } from "zod";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventsQueryOptions } from "./get-events";
import { Event } from "../types/api";

export const createEventInputSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  organizer: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  startsAt: z.string().min(1, "Required"),
  endsAt: z.string().optional().nullable(),
  externalLink: z.string().optional().nullable(),
  isActive: z.boolean(),
});

export type CreateEventInput = z.infer<typeof createEventInputSchema>;

export const createEvent = ({
  data,
}: {
  data: CreateEventInput;
}): Promise<Event> => {
  return api.post(`/events`, data);
};

type UseCreateEventOptions = {
  mutationConfig?: MutationConfig<typeof createEvent>;
};

export const useCreateEvent = ({
  mutationConfig,
}: UseCreateEventOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEventsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createEvent,
  });
};
