import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Room } from "@/features/rooms/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getRoomsQueryOptions } from "./get-rooms";
import { updateRoomImage } from "./update-room-image";
import {
  PRIVATE_ACCEPTED_FILE_TYPES,
  PRIVATE_MAX_FILE_SIZE,
} from "@/features/files/api/upload-file";

export const createRoomInputSchema = z.object({
  code: z.string().min(1, "Required"),
  nameTh: z.string().min(1, "Required"),
  nameEn: z.string().optional(),
  floor: z.string().min(1, "Required"),
  capacity: z.number().min(1, "Must be at least 1"),
  buildingId: z.string().min(1, "Required"),
  typeId: z.string().min(1, "Required"),
  personnelId: z.string().optional().nullable(),
  file: z.file().mime(PRIVATE_ACCEPTED_FILE_TYPES).max(PRIVATE_MAX_FILE_SIZE).optional().nullable(),
});

export type CreateRoomInput = z.infer<typeof createRoomInputSchema>;

export const createRoom = ({
  data,
}: {
  data: Omit<CreateRoomInput, "file">;
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

type CreateRoomArgs = {
  data: Omit<CreateRoomInput, "file">;
  file?: File | null;
};

export const useCreateRoom = ({
  mutationConfig,
}: UseCreateRoomOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getRoomsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    mutationFn: async ({ data, file }: CreateRoomArgs): Promise<Room> => {
      const room = await createRoom({ data });

      if (file) {
        return updateRoomImage({ id: room.id, file });
      }

      return room;
    },
  });
};
