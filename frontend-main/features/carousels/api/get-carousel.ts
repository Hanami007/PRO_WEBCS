import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Carousel } from "../types/api";

export const getCarousel = ({
  carouselId,
}: {
  carouselId: string;
}): Promise<Carousel> => {
  return api.get(`/carousels/${carouselId}`);
};

export const getCarouselQueryOptions = (carouselId: string) => {
  return queryOptions({
    queryKey: ["carousels", carouselId],
    queryFn: () => getCarousel({ carouselId }),
  });
};

export const useCarousel = (carouselId: string) => {
  return useQuery(getCarouselQueryOptions(carouselId));
};
