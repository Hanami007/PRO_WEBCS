import { FileEntity, Entity } from "@/types/api";

export type Event = Entity<{
  title: string;
  description: string;
  organizer: string;
  startsAt: string;
  endsAt: string | null;
  location: string;
  externalLink: string | null;
  isActive: boolean;
  poster: FileEntity | null;
}>;
