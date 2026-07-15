"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MisEquipmentBorrow } from "../../types/api";
import { MisEquipmentBorrowActions } from "./mis-equipment-borrow-actions";
import { Badge } from "@/components/ui/badge";

const statusMap: Record<MisEquipmentBorrow["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  borrowed: { label: "กำลังยืม", variant: "secondary" },
  returned: { label: "คืนแล้ว", variant: "default" },
  overdue: { label: "เกินกำหนด", variant: "destructive" },
};

export const misEquipmentBorrowColumns: ColumnDef<MisEquipmentBorrow>[] = [
  {
    accessorKey: "borrowerName",
    header: "ชื่อผู้ยืม",
    size: 180,
    cell: ({ row }) => <span className="font-medium">{row.original.borrowerName}</span>,
  },
  {
    accessorKey: "equipmentName",
    header: "ชื่ออุปกรณ์",
    size: 220,
  },
  {
    accessorKey: "quantity",
    header: "จำนวน",
    size: 80,
  },
  {
    accessorKey: "borrowDate",
    header: "วันที่ยืม",
    size: 120,
  },
  {
    accessorKey: "returnDate",
    header: "กำหนดคืน",
    size: 120,
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    size: 130,
    cell: ({ row }) => {
      const s = statusMap[row.original.status] ?? statusMap.borrowed;
      return <Badge variant={s.variant}>{s.label}</Badge>;
    },
  },
  {
    id: "actions",
    size: 60,
    cell: ({ row }) => <MisEquipmentBorrowActions item={row.original} />,
  },
];
