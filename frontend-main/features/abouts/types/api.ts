import { Entity, FileEntity } from "@/types/api";

export type AboutContent = Entity<{
  section: AboutSection;
  layoutType: aboutContentLayoutEnum;
  title: string;
  body: string;
  image: FileEntity;
  sortOrder: number;
}>;

export type AboutSection = Entity<{
  slug: string;
  title: string;
  sortOrder: number;
  contents: AboutContent[];
}>;

export enum aboutContentLayoutEnum {
  TEXT = "text",
  IMAGE = "image",
}
