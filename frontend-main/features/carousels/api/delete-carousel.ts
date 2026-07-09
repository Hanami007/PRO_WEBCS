import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCarouselsQueryOptions } from "./get-carousels";

export const deleteCarousel = ({ carouselId }: { carouselId: string }) => {
  return api.delete(`/carousels/${carouselId}`);
};

type UseDeleteCarouselOptions = {
  mutationConfig?: MutationConfig<typeof deleteCarousel>;
};

export const useDeleteCarousel = ({
  mutationConfig,
}: UseDeleteCarouselOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCarouselsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteCarousel,
  });
};
