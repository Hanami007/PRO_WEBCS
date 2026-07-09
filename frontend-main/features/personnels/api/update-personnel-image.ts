import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Personnel } from "@/features/personnels/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { uploadFile } from "@/features/files/api/upload-file";
import { FileEntity } from "@/types/api";
import { getPersonnelQueryOptions } from "./get-personnel";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updatePersonnelImageInputSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export type UpdatePersonnelImageInput = z.infer<
  typeof updatePersonnelImageInputSchema
>;

type UpdatePersonnelImageParams = {
  id: string;
  file: File;
};

export const updatePersonnelImage = async ({
  id,
  file,
}: UpdatePersonnelImageParams): Promise<Personnel> => {
  const imagePayload: FileEntity = await uploadFile({
    file,
    prefix: "personnels",
  });
  return api.patch(`/personnels/${id}`, {
    profileImage: imagePayload,
  });
};

type UseUpdatePersonnelImageOptions = {
  mutationConfig?: MutationConfig<typeof updatePersonnelImage>;
};

export const useUpdatePersonnelImage = ({
  mutationConfig,
}: UseUpdatePersonnelImageOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getPersonnelQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updatePersonnelImage,
  });
};
