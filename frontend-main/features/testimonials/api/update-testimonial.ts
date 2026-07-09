import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Testimonial } from "../types/api";
import { getTestimonialQueryOptions } from "./get-testimonial";
import { getTestimonialsQueryOptions } from "./get-testimonials";

export const updateTestimonialInputSchema = z.object({
  authorName: z.string().min(1, "Required"),
  authorTitle: z.string().min(1, "Required"),
  content: z.string().min(1, "Required"),
  isActive: z.boolean().optional(),
});

export type UpdateTestimonialInput = z.infer<
  typeof updateTestimonialInputSchema
>;

export const updateTestimonial = ({
  data,
  testimonialId,
}: {
  data: UpdateTestimonialInput;
  testimonialId: string;
}): Promise<Testimonial> => {
  return api.patch(`/testimonials/${testimonialId}`, data);
};

type UseUpdateTestimonialOptions = {
  mutationConfig?: MutationConfig<typeof updateTestimonial>;
};

export const useUpdateTestimonial = ({
  mutationConfig,
}: UseUpdateTestimonialOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getTestimonialQueryOptions(data.id).queryKey,
      });
      queryClient.refetchQueries({
        queryKey: getTestimonialsQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateTestimonial,
  });
};
