import { FileEntity, Entity } from "@/types/api";
import { Personnel } from "@/features/personnels/types/api";

export type Project = Entity<{
  code: string;
  name: string;
  year: string;
  detail: string;
  editors: string[];
  chairman: Personnel;
  director1?: Personnel | null;
  director2?: Personnel | null;
  file?: FileEntity | null;
}>;
