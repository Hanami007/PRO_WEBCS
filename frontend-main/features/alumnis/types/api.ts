import { Entity, FileEntity } from "@/types/api";

export type Alumni = Entity<{
  fullName: string;
  cohort: string;
  workplace: string;
  position: string;
  quote: string;
  profileImage?: FileEntity;
}>;
