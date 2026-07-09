import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Testimonial } from "../types/api";

export const getTestimonial = ({
  testimonialId,
}: {
  testimonialId: string;
}): Promise<Testimonial> => {
  return api.get(`/testimonials/${testimonialId}`);
};

export const getTestimonialQueryOptions = (testimonialId: string) => {
  return queryOptions({
    queryKey: ["testimonials", testimonialId],
    queryFn: () => getTestimonial({ testimonialId }),
  });
};

export const useTestimonial = (testimonialId: string) => {
  return useQuery(getTestimonialQueryOptions(testimonialId));
};
