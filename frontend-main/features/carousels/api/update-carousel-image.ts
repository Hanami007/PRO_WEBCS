import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { FileEntity } from "@/types/api";
import { uploadFile } from "@/features/files/api/upload-file";
import { api } from "@/lib/api-client";
import { Carousel } from "../types/api";
import { getCarouselQueryOptions } from "./get-carousel";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updateCarouselImageInputSchema = z.object({
  file: z.file().mime(ACCEPTED_IMAGE_TYPES).max(MAX_FILE_SIZE),
});

export type UpdateCarouselImageInput = z.infer<
  typeof updateCarouselImageInputSchema
>;

type UpdateCarouselImageParams = {
  carouselId: string;
  file: File | null;
};

export const useUpdateCarouselImage = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<
    (data: UpdateCarouselImageParams) => Promise<Carousel>
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getCarouselQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },

    mutationFn: async ({
      carouselId,
      file,
    }: UpdateCarouselImageParams): Promise<Carousel> => {
      let imagePayload: FileEntity | null = null;

      if (file) {
        imagePayload = await uploadFile({ file, prefix: "carousels" });
      }

      return api.patch(`/carousels/${carouselId}`, {
        image: imagePayload,
      });
    },
  });
};
