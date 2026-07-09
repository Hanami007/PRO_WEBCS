"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { useCarousels } from "../api/get-carousels";

const HomeCarousel = () => {
  const carouselsQuery = useCarousels({
    page: 1,
    limit: 20,
    "filter.isActive": "$eq:true",
  });

  if (carouselsQuery.isLoading) {
    return <Spinner />;
  }

  const images = carouselsQuery?.data?.data?.filter((item) => item.isActive);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative py-24 space-y-8 wrapper-body text-foreground">
      <div className="flex flex-col items-center space-y-8">
        <h2 className="text-3xl font-semibold">Our Achievement</h2>
      </div>

      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id} className="basis-1/2 lg:basis-1/3">
              <AspectRatio ratio={16 / 9}>
                {image.image?.url ? (
                  <Image
                    src={image.image.url}
                    alt={image.title}
                    width="1280"
                    height="720"
                    className="rounded-md"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted rounded-md text-muted-foreground text-xs text-center p-2">
                    No image available for: {image.title}
                  </div>
                )}
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
