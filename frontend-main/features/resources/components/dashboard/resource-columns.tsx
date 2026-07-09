"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Resource } from "../../types/api";
import { ResourceActions } from "./resource-actions";
import { ExternalLink } from "lucide-react";

export const resourceColumns: ColumnDef<Resource>[] = [
  {
    accessorKey: "key",
    header: "Key (Name)",
    size: 100,
    cell: ({ row }) => <div className="font-medium">{row.getValue("key")}</div>,
  },
  {
    accessorKey: "value",
    header: "Value (URL/Content)",
    size: 200,
    cell: ({ row }) => {
      const value = row.getValue("value") as string;
      const isUrl = value.startsWith("http");
      return (
        <div className="flex items-center gap-1 max-w-[500px]">
          <span className="truncate">{value}</span>
          {isUrl && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Note",
    size: 300,
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <ResourceActions resource={row.original} />,
  },
];
