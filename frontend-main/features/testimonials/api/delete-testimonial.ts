import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTestimonialsQueryOptions } from "./get-testimonials";

export const deleteTestimonial = ({
  testimonialId,
}: {
  testimonialId: string;
}) => {
  return api.delete(`/testimonials/${testimonialId}`);
};

type UseDeleteTestimonialOptions = {
  mutationConfig?: MutationConfig<typeof deleteTestimonial>;
};

export const useDeleteTestimonial = ({
  mutationConfig,
}: UseDeleteTestimonialOptions = {}) => {
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
    mutationFn: deleteTestimonial,
  });
};
