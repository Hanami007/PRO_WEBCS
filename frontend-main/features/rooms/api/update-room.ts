import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Room } from "@/features/rooms/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getRoomQueryOptions } from "./get-room";

export const updateRoomInputSchema = z.object({
  code: z.string().min(1, "Required"),
  nameTh: z.string().min(1, "Required"),
  nameEn: z.string().optional(),
  floor: z.string().min(1, "Required"),
  capacity: z.number().min(1, "Must be at least 1"),
  buildingId: z.string().min(1, "Required"),
  typeId: z.string().min(1, "Required"),
  personnelId: z.string().optional().nullable(),
});

export type UpdateRoomInput = z.infer<typeof updateRoomInputSchema>;

export const updateRoom = ({
  data,
  roomId,
}: {
  data: UpdateRoomInput;
  roomId: string;
}): Promise<Room> => {
  const { buildingId, typeId, personnelId, ...rest } = data;
  const payload = {
    ...rest,
    building: { id: buildingId },
    type: { id: typeId },
    ...(personnelId ? { personnel: { id: personnelId } } : { personnel: null }),
  };
  return api.patch(`/rooms/${roomId}`, payload);
};

type UseUpdateRoomOptions = {
  mutationConfig?: MutationConfig<typeof updateRoom>;
};

export const useUpdateRoom = ({
  mutationConfig,
}: UseUpdateRoomOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getRoomQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateRoom,
  });
};
