import { Entity, FileEntity } from "@/types/api";

export type Carousel = Entity<{
  title: string;
  description: string;
  image: FileEntity;
  isActive: boolean;
  sortOrder: number;
}>;
