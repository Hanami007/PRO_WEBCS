"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Alumni } from "../../types/api";
import { AlumniActions } from "./alumni-actions";

export const alumnisColumns: ColumnDef<Alumni>[] = [
  {
    accessorKey: "fullName",
    header: "Fullname",
    size: 300,
  },
  {
    accessorKey: "cohort",
    header: () => <div className="text-center">รุ่นที่</div>,
    size: 100,
    cell: ({ row }) => <div className="text-center">{row.original.cohort}</div>,
  },
  {
    accessorKey: "position",
    header: "Position",
    size: 250,
  },
  {
    accessorKey: "workplace",
    header: "Workplace",
    size: 300,
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <AlumniActions alumni={row.original} />,
  },
];
