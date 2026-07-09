import { Entity } from "@/types/api";

export type Resource = Entity<{
  key: string;
  value: string;
  description: string;
}>;
