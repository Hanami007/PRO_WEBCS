import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Meta, PaginatedParams } from "@/types/api";
import { Testimonial } from "../types/api";
import { QueryConfig } from "@/lib/react-query";

export const getTestimonials = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
    filter: "",
  },
): Promise<{
  data: Testimonial[];
  meta: Meta;
}> => {
  return api.get(`/testimonials`, { params });
};

export const getTestimonialsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["testimonials", params],
    queryFn: () => getTestimonials(params),
  });
};

type UseTestimonialsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getTestimonialsQueryOptions>;
};

export const useTestimonials = ({
  queryConfig,
  ...params
}: UseTestimonialsOptions = {}) => {
  return useQuery({
    ...getTestimonialsQueryOptions(params),
    ...queryConfig,
  });
};
