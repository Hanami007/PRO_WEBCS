import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Room } from "../types/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updateRoomImageInputSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export type UpdateRoomImageInput = z.infer<
  typeof updateRoomImageInputSchema
>;

type UpdateRoomImageParams = {
  id: string;
  file: File;
};

export const updateRoomImage = ({
  id,
  file,
}: UpdateRoomImageParams): Promise<Room> => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(`/rooms/${id}/image`, formData);
};

type UseUpdateRoomImageOptions = {
  mutationConfig?: MutationConfig<typeof updateRoomImage>;
};

export const useUpdateRoomImage = ({
  mutationConfig,
}: UseUpdateRoomImageOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateRoomImage,
  });
};
