"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderX } from "lucide-react";
import { CreateCarousel } from "./dashboard/create-carousel";

const CarouselEmpty = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderX />
        </EmptyMedia>
        <EmptyTitle>No Carousels Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any carousels yet. Get started by creating
          your first carousel.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <CreateCarousel />
      </EmptyContent>
    </Empty>
  );
};

export default CarouselEmpty;
