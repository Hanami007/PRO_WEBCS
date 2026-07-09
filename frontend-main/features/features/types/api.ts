import { Entity, FileEntity } from "@/types/api";

export type Feature = Entity<{
  title: string;
  description: string;
  type: string;
  value: string;
  prefix: string;
  suffix: string;
  isActive: boolean;
  image: FileEntity;
}>;
