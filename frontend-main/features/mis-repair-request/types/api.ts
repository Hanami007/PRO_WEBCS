import { Entity, FileEntity } from "@/types/api";

export type RepairRequestStatus = "pending" | "in_progress" | "resolved";

export type MisRepairRequest = Entity<{
  reporterName: string;
  location: string;
  itemName: string;
  description: string;
  status: RepairRequestStatus;
  image: FileEntity | null;
}>;
