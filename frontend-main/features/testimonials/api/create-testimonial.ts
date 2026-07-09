import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Testimonial } from "../types/api";
import { getTestimonialsQueryOptions } from "./get-testimonials";

export const createTestimonialInputSchema = z.object({
  authorName: z.string().min(1, "Required"),
  authorTitle: z.string().min(1, "Required"),
  content: z.string().min(1, "Required"),
  isActive: z.boolean().optional(),
});

export type CreateTestimonialInput = z.infer<
  typeof createTestimonialInputSchema
>;

export const createTestimonial = ({
  data,
}: {
  data: CreateTestimonialInput;
}): Promise<Testimonial> => {
  return api.post(`/testimonials`, data);
};

type UseCreateTestimonialOptions = {
  mutationConfig?: MutationConfig<typeof createTestimonial>;
};

export const useCreateTestimonial = ({
  mutationConfig,
}: UseCreateTestimonialOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getTestimonialsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createTestimonial,
  });
};
