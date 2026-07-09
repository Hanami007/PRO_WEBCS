import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoomsQueryOptions } from "./get-rooms";

export const deleteRoom = ({ id }: { id: string }) => {
  return api.delete(`/rooms/${id}`);
};

type UseDeleteRoomOptions = {
  mutationConfig?: MutationConfig<typeof deleteRoom>;
};

export const useDeleteRoom = ({
  mutationConfig,
}: UseDeleteRoomOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getRoomsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteRoom,
  });
};
