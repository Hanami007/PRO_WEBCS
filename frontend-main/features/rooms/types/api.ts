import { Personnel } from "@/features/personnels/types/api";
import { Entity, FileEntity } from "@/types/api";

export enum RoomType {
  LECTURE = "LECTURE",
  LAB = "LAB",
  MEETING = "MEETING",
  OTHER = "OTHER",
}

export type Room = Entity<{
  code: string;
  nameTh: string;
  nameEn?: string;
  floor: string;
  capacity: number;
  image?: FileEntity;
  type?: { id: string; name: string };
  building?: { id: string; name: string };
  personnel: Personnel;
}>;
