import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { FileEntity, User } from "@/types/api";
import { uploadFile } from "@/features/files/api/upload-file";
import { api } from "@/lib/api-client";
import { userQueryKey } from "@/lib/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updateUserPhotoInputSchema = z.object({
  file: z.file().mime(ACCEPTED_IMAGE_TYPES).max(MAX_FILE_SIZE),
});

export type UpdateUserPhotoInput = z.infer<typeof updateUserPhotoInputSchema>;

type UpdateUserPhotoParams = {
  userId: string;
  file: File | null;
};

export const useUpdateUserPhoto = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<
    (data: UpdateUserPhotoParams) => Promise<User>
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: userQueryKey,
      });
      onSuccess?.(data, ...args);
    },

    mutationFn: async ({
      userId,
      file,
    }: UpdateUserPhotoParams): Promise<User> => {
      let imagePayload: FileEntity | null = null;

      if (file) {
        imagePayload = await uploadFile({ file, prefix: "users" });
      }

      return api.patch(`/users/${userId}`, {
        photo: imagePayload,
      });
    },
  });
};
