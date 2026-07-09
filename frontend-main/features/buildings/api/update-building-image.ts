import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Building } from "@/features/buildings/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { uploadFile } from "@/features/files/api/upload-file";
import { FileEntity } from "@/types/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updateBuildingImageInputSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export type UpdateBuildingImageInput = z.infer<
  typeof updateBuildingImageInputSchema
>;

type UpdateBuildingImageParams = {
  id: string;
  file: File;
};

export const updateBuildingImage = async ({
  id,
  file,
}: UpdateBuildingImageParams): Promise<Building> => {
  const imagePayload: FileEntity = await uploadFile({
    file,
    prefix: "buildings",
  });

  return api.patch(`/buildings/${id}`, {
    image: imagePayload,
  });
};

type UseUpdateBuildingImageOptions = {
  mutationConfig?: MutationConfig<typeof updateBuildingImage>;
};

export const useUpdateBuildingImage = ({
  mutationConfig,
}: UseUpdateBuildingImageOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["buildings"],
      });
      const data = args[0];
      queryClient.invalidateQueries({
        queryKey: ["buildings", data.id],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateBuildingImage,
  });
};
