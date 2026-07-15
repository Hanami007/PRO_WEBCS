"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MisCoursePending } from "../../types/api";
import { MisCoursePendingActions } from "./mis-course-pending-actions";
import { Badge } from "@/components/ui/badge";

const statusMap: Record<MisCoursePending["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "รอดำเนินการ", variant: "outline" },
  in_progress: { label: "กำลังดำเนินการ", variant: "secondary" },
  resolved: { label: "เสร็จสิ้น", variant: "default" },
};

export const misCoursePendingColumns: ColumnDef<MisCoursePending>[] = [
  {
    accessorKey: "createdAt",
    header: "วันที่แจ้ง",
    size: 160,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(date);
    },
  },
  {
    accessorKey: "studentId",
    header: "รหัสนักศึกษา",
    size: 130,
  },
  {
    accessorKey: "studentName",
    header: "ชื่อ-นามสกุล",
    size: 200,
    cell: ({ row }) => <span className="font-medium">{row.original.studentName}</span>,
  },
  {
    accessorKey: "courseCode",
    header: "รหัสวิชา",
    size: 100,
  },
  {
    accessorKey: "courseName",
    header: "ชื่อวิชา",
    size: 200,
    cell: ({ row }) => <span className="line-clamp-1">{row.original.courseName}</span>,
  },
  {
    accessorKey: "advisor",
    header: "อาจารย์ผู้ดูแล",
    size: 180,
    cell: ({ row }) => <span className="line-clamp-1">{row.original.advisor || "-"}</span>,
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
    id: "actions",
    size: 60,
    cell: ({ row }) => <MisCoursePendingActions item={row.original} />,
  },
];
