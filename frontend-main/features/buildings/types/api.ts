import { Entity, FileEntity } from "@/types/api";

export type Building = Entity<{
  name: string;
  image?: FileEntity;
}>;
