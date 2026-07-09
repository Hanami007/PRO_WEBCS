import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getCarouselsQueryOptions } from "./get-carousels";
import { Carousel } from "../types/api";
import { FileEntity } from "@/types/api";
import {
  PRIVATE_ACCEPTED_FILE_TYPES,
  PRIVATE_MAX_FILE_SIZE,
  uploadFile,
} from "@/features/files/api/upload-file";

export const createCarouselInputSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  image: z.custom<FileEntity>().optional(),
  file: z.file().mime(PRIVATE_ACCEPTED_FILE_TYPES).max(PRIVATE_MAX_FILE_SIZE),
});

export type CreateCarouselInput = z.infer<typeof createCarouselInputSchema>;

export type CreateCarouselApiData = Omit<CreateCarouselInput, "file">;

export const createCarousel = ({
  data,
}: {
  data: CreateCarouselApiData;
}): Promise<Carousel> => {
  return api.post(`/carousels`, data);
};

type UseCreateCarouselOptions = {
  mutationConfig?: MutationConfig<typeof createCarousel>;
};

type CreateCarouselArgs = {
  data: CreateCarouselApiData;
  file?: File | null;
};

export const useCreateCarousel = ({
  mutationConfig,
}: UseCreateCarouselOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCarouselsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    mutationFn: async ({ data, file }: CreateCarouselArgs) => {
      let uploadedImage: FileEntity | undefined = undefined;

      if (file) {
        uploadedImage = await uploadFile({ file, prefix: " carousels" });
      }

      const payload = uploadedImage ? { ...data, image: uploadedImage } : data;

      return createCarousel({ data: payload });
    },
  });
};
