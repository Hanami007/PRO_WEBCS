import { Entity, FileEntity } from "@/types/api";

export type Complain = Entity<{
  title: string;
  detail: string;
  image: FileEntity;
}>;
