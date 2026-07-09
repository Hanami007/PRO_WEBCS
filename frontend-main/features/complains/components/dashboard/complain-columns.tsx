"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Complain } from "../../types/api";
import { ComplainActions } from "./complain-actions";
import { ImageIcon } from "lucide-react";

export const complainColumns: ColumnDef<Complain>[] = [
  {
    accessorKey: "createdAt",
    header: "Date and time",
    size: 180,
    cell: ({ row }) => {
      const dateString = row.original.createdAt;
      if (!dateString) return "-";
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 300,
    cell: ({ row }) => (
      <span className="font-medium line-clamp-1">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "detail",
    header: "Detail",
    size: 400,
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground line-clamp-1 max-w-[400px]">
        {row.original.detail}
      </span>
    ),
  },
  {
    id: "hasImage",
    header: "Image",
    size: 80,
    cell: ({ row }) => {
      return row.original.image ? (
        <ImageIcon className="w-4 h-4 text-primary" />
      ) : (
        <span className="text-xs text-muted-foreground">-</span>
      );
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <ComplainActions complain={row.original} />,
  },
];
