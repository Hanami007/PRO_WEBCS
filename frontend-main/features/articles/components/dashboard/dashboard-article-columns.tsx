"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Article } from "../../types/api";
import { ArticleActions } from "./article-actions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const articleColumns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "หัวข้อข่าว",
    size: 500,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 overflow-hidden">
        <Badge variant="outline" className="shrink-0 h-fit capitalize">
          {row.original.category}
        </Badge>
        <p className="truncate font-medium">{row.original.title}</p>
      </div>
    ),
  },
  {
    accessorKey: "published",
    header: "สถานะ",
    size: 150,
    cell: ({ row }) => {
      const isPublished = row.getValue("published");
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isPublished ? "bg-emerald-500" : "bg-slate-400",
            )}
          />
          <span
            className={cn(
              "text-sm font-medium",
              isPublished ? "text-emerald-600" : "text-slate-600",
            )}
          >
            {isPublished ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "วันที่สร้าง",
    size: 150,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
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
    cell: ({ row }) => <ArticleActions article={row.original} />,
  },
];
