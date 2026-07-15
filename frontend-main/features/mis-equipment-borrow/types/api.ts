import { Entity } from "@/types/api";

export type EquipmentBorrowStatus = "borrowed" | "returned" | "overdue";

export type MisEquipmentBorrow = Entity<{
  borrowerName: string;
  equipmentName: string;
  quantity: number;
  borrowDate: string;
  returnDate: string;
  status: EquipmentBorrowStatus;
  note: string | null;
}>;
