"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Announcement, AnnouncementStatus } from "../../types/api";
import { Badge } from "@/components/ui/badge";
import { AnnouncementActions } from "./announcement-actions";

export const announcementColumns: ColumnDef<Announcement>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 500,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 overflow-hidden">
        <Badge variant="outline" className="shrink-0 h-fit capitalize">
          {row.original.type}
        </Badge>
        <p className="truncate font-medium">{row.original.title}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    size: 150,
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex items-center gap-2">
          {status === AnnouncementStatus.DRAFT && (
            <span className="text-sm font-medium text-slate-500">ฉบับร่าง</span>
          )}
          {status === AnnouncementStatus.PUBLISHED && (
            <span className="text-sm font-medium text-green-600">เผยแพร่</span>
          )}
          {status === AnnouncementStatus.ARCHIVED && (
            <span className="text-sm font-medium text-zinc-500">หมดอายุ</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "publishedAt",
    header: "วันเผยแพร่",
    size: 150,
    cell: ({ row }) => {
      const date = new Date(row.getValue("publishedAt"));
      return (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {new Intl.DateTimeFormat("th-TH", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(date)}
        </span>
      );
    },
  },
  {
    accessorKey: "expiresAt",
    header: "วันหมดอายุ",
    size: 150,
    cell: ({ row }) => {
      const date = new Date(row.getValue("expiresAt"));
      return (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {new Intl.DateTimeFormat("th-TH", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(date)}
        </span>
      );
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <AnnouncementActions announcement={row.original} />,
  },
];
