"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MisRepairRequest } from "../../types/api";
import { MisRepairRequestActions } from "./mis-repair-request-actions";
import { Badge } from "@/components/ui/badge";

const statusMap: Record<
  MisRepairRequest["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pending: { label: "รอดำเนินการ", variant: "outline" },
  in_progress: { label: "กำลังซ่อม", variant: "secondary" },
  resolved: { label: "ซ่อมเสร็จ", variant: "default" },
};

// Helper to extract equipment code from itemName if present
function parseItemInfo(itemName: string) {
  const match = itemName.match(/(.+?)\s*\(รหัส:\s*(.+?)\)/);
  if (match) {
    return { name: match[1].trim(), code: match[2].trim() };
  }
  return { name: itemName, code: "-" };
}

export const misRepairRequestColumns: ColumnDef<MisRepairRequest>[] = [
  {
    id: "equipmentCode",
    header: "รหัสครุภัณฑ์",
    size: 160,
    cell: ({ row }) => {
      const { code } = parseItemInfo(row.original.itemName);
      return (
        <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
          {code}
        </span>
      );
    },
  },
  {
    id: "itemName",
    header: "ชื่อครุภัณฑ์",
    size: 180,
    cell: ({ row }) => {
      const { name } = parseItemInfo(row.original.itemName);
      return (
        <span className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1">
          {name}
        </span>
      );
    },
  },
  {
    accessorKey: "location",
    header: "ห้องเก็บ",
    size: 150,
    cell: ({ row }) => (
      <span className="text-slate-700 dark:text-slate-300 line-clamp-1">
        {row.original.location}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "ความเสียหาย / ข้อบกพร่อง",
    size: 220,
    cell: ({ row }) => (
      <span className="text-slate-600 dark:text-slate-400 line-clamp-2 text-xs">
        {row.original.description || "-"}
      </span>
    ),
  },
  {
    accessorKey: "reporterName",
    header: "ผู้แจ้ง",
    size: 150,
    cell: ({ row }) => (
      <span className="font-medium text-slate-800 dark:text-slate-200">
        {row.original.reporterName}
      </span>
    ),
  },
  {
    id: "status",
    header: "สถานะ",
    size: 120,
    cell: ({ row }) => {
      const s = statusMap[row.original.status] ?? statusMap.pending;
      return <Badge variant={s.variant}>{s.label}</Badge>;
    },
  },
  {
    id: "actions",
    header: "การจัดการ",
    size: 100,
    cell: ({ row }) => <MisRepairRequestActions item={row.original} />,
  },
];
