import { uploadFile } from "@/features/files/api/upload-file";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventQueryOptions } from "./get-event";
import { Event } from "../types/api";

export const updateEventPoster = async ({
  eventId,
  file,
}: {
  eventId: string;
  file: File | null;
}): Promise<Event> => {
  let posterPayload = null;

  if (file) {
    const uploadedFile = await uploadFile({ file, prefix: "events" });
    posterPayload = { id: uploadedFile.id };
  }

  return api.patch(`/events/${eventId}`, {
    poster: posterPayload,
  });
};

type UseUpdateEventPosterOptions = {
  mutationConfig?: MutationConfig<typeof updateEventPoster>;
};

export const useUpdateEventPoster = ({
  mutationConfig,
}: UseUpdateEventPosterOptions = {}) => {
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
    mutationFn: updateEventPoster,
  });
};
