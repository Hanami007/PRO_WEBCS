import { Entity, FileEntity } from "@/types/api";

export const CONTACT_TYPES = ["email", "phone", "url"] as const;
export type ContactType = (typeof CONTACT_TYPES)[number];

export type Contact = Entity<{
  title: string;
  description: string;
  value: string;
  label: string;
  type: ContactType;
  sortOrder: number;
  isActive: boolean;
  image: FileEntity;
}>;
