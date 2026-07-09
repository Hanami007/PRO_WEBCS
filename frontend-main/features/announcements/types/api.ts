import { Entity } from "@/types/api";

export type Announcement = Entity<{
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  type: AnnouncementType;
  status: AnnouncementStatus;
  publishedAt: string;
  expiresAt: string;
}>;

export enum AnnouncementType {
  INFO = "info",
  WARNING = "warning",
  URGENT = "urgent",
  NEW_FEATURE = "new_feature",
}

export enum AnnouncementStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}
