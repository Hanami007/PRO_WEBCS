import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getCarouselQueryOptions } from "./get-carousel";
import { getCarouselsQueryOptions } from "./get-carousels";
import { Carousel } from "../types/api";

export const updateCarouselInputSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  sortOrder: z.number().optional(),
  isActive: z.boolean().optional(),
});

export type UpdateCarouselInput = z.infer<typeof updateCarouselInputSchema>;

export const updateCarousel = ({
  data,
  carouselId,
}: {
  data: UpdateCarouselInput;
  carouselId: string;
}): Promise<Carousel> => {
  return api.patch(`/carousels/${carouselId}`, data);
};

type UseUpdateCarouselOptions = {
  mutationConfig?: MutationConfig<typeof updateCarousel>;
};

export const useUpdateCarousel = ({
  mutationConfig,
}: UseUpdateCarouselOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getCarouselQueryOptions(data.id).queryKey,
      });
      queryClient.refetchQueries({
        queryKey: getCarouselsQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateCarousel,
  });
};
