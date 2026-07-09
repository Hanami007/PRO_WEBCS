import { Entity, FileEntity } from "@/types/api";

export type Testimonial = Entity<{
  authorName: string;
  authorTitle: string;
  content: string;
  image: FileEntity;
  isActive: boolean;
}>;
