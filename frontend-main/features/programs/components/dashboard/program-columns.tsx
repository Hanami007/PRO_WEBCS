"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Program } from "../../types/api";
import { ProgramActions } from "./program-actions";
import { Badge } from "@/components/ui/badge";

export const programsColumns: ColumnDef<Program>[] = [
  {
    accessorKey: "code",
    header: "Code",
    size: 100,
  },
  {
    accessorKey: "nameTh",
    header: "Name (TH)",
    size: 500,
  },
  {
    accessorKey: "credits",
    header: () => <div className="text-center">Credits</div>,
    size: 100,
    cell: ({ row }) => <div className="text-center font-medium">{row.original.credits}</div>,
  },
  {
    accessorKey: "isActive",
    header: () => <div className="text-center">Status</div>,
    size: 120,
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <div className="flex justify-center">
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "isCurrent",
    header: () => <div className="text-center">Revision</div>,
    size: 120,
    cell: ({ row }) => {
      const isCurrent = row.original.isCurrent;
      return (
        <div className="flex justify-center">
          <Badge variant="outline">
            {isCurrent ? "Current" : "Archived"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <ProgramActions program={row.original} />,
  },
];
