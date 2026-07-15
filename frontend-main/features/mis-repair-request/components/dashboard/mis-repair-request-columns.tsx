"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MisRepairRequest } from "../../types/api";
import { MisRepairRequestActions } from "./mis-repair-request-actions";
import { Badge } from "@/components/ui/badge";
import { ImageIcon } from "lucide-react";

const statusMap: Record<MisRepairRequest["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "รอดำเนินการ", variant: "outline" },
  in_progress: { label: "กำลังซ่อม", variant: "secondary" },
  resolved: { label: "ซ่อมเสร็จ", variant: "default" },
};

export const misRepairRequestColumns: ColumnDef<MisRepairRequest>[] = [
  {
    accessorKey: "createdAt",
    header: "วันที่แจ้ง",
    size: 140,
    cell: ({ row }) => new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(new Date(row.original.createdAt)),
  },
  {
    accessorKey: "reporterName",
    header: "ผู้แจ้ง",
    size: 160,
    cell: ({ row }) => <span className="font-medium">{row.original.reporterName}</span>,
  },
  {
    accessorKey: "location",
    header: "สถานที่",
    size: 150,
    cell: ({ row }) => <span className="line-clamp-1">{row.original.location}</span>,
  },
  {
    accessorKey: "itemName",
    header: "อุปกรณ์",
    size: 180,
    cell: ({ row }) => <span className="line-clamp-1">{row.original.itemName}</span>,
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    size: 130,
    cell: ({ row }) => {
      const s = statusMap[row.original.status] ?? statusMap.pending;
      return <Badge variant={s.variant}>{s.label}</Badge>;
    },
  },
  {
    id: "hasImage",
    header: "รูป",
    size: 60,
    cell: ({ row }) => row.original.image
      ? <ImageIcon className="w-4 h-4 text-primary" />
      : <span className="text-xs text-muted-foreground">-</span>,
  },
  {
    id: "actions",
    size: 60,
    cell: ({ row }) => <MisRepairRequestActions item={row.original} />,
  },
];
