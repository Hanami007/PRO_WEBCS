import z from "zod";
import { Testimonial } from "../types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { FileEntity } from "@/types/api";
import { uploadFile } from "@/features/files/api/upload-file";
import { api } from "@/lib/api-client";
import { getTestimonialQueryOptions } from "./get-testimonial";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updateTestimonialImageInputSchema = z.object({
  file: z.file().mime(ACCEPTED_IMAGE_TYPES).max(MAX_FILE_SIZE),
});

export type UpdateTestimonialImageInput = z.infer<
  typeof updateTestimonialImageInputSchema
>;

type UpdateTestimonialImageParams = {
  testimonialId: string;
  file: File | null;
};

export const useUpdateTestimonialImage = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<
    (data: UpdateTestimonialImageParams) => Promise<Testimonial>
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getTestimonialQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },

    mutationFn: async ({
      testimonialId,
      file,
    }: UpdateTestimonialImageParams): Promise<Testimonial> => {
      let imagePayload: FileEntity | null = null;

      if (file) {
        imagePayload = await uploadFile({ file, prefix: "testimonials" });
      }

      return api.patch(`/testimonials/${testimonialId}`, {
        image: imagePayload,
      });
    },
  });
};
