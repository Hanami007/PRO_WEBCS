import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Room } from "@/features/rooms/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getRoomsQueryOptions } from "./get-rooms";

export const createRoomInputSchema = z.object({
  code: z.string().min(1, "Required"),
  nameTh: z.string().min(1, "Required"),
  nameEn: z.string().optional(),
  floor: z.string().min(1, "Required"),
  capacity: z.number().min(1, "Must be at least 1"),
  buildingId: z.string().min(1, "Required"),
  typeId: z.string().min(1, "Required"),
  personnelId: z.string().optional().nullable(),
});

export type CreateRoomInput = z.infer<typeof createRoomInputSchema>;

export const createRoom = ({
  data,
}: {
  data: CreateRoomInput;
}): Promise<Room> => {
  const payload = {
    code: data.code,
    nameTh: data.nameTh,
    nameEn: data.nameEn,
    floor: data.floor,
    capacity: data.capacity,
    building: { id: data.buildingId },
    type: { id: data.typeId },
    personnel: data.personnelId ? { id: data.personnelId } : null,
  };

  return api.post(`/rooms`, payload);
};

type UseCreateRoomOptions = {
  mutationConfig?: MutationConfig<typeof createRoom>;
};

export const useCreateRoom = ({
  mutationConfig,
}: UseCreateRoomOptions = {}) => {
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
    mutationFn: createRoom,
  });
};
