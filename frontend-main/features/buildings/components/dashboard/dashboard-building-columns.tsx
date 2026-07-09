"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Building } from "@/features/buildings/types/api";
import { BuildingActions } from "./building-actions";

export const buildingsColumns: ColumnDef<Building>[] = [
  {
    accessorKey: "name",
    header: "Building Name",
    size: 600,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <BuildingActions building={row.original} />,
  },
];
