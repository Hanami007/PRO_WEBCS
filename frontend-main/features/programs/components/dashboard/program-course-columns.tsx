"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProgramCourse } from "@/features/programs/types/api";
import { ProgramCourseActions } from "./program-course-actions";

export const getProgramCourseColumns = (
  programId: string,
): ColumnDef<ProgramCourse>[] => [
  {
    id: "course.code",
    accessorKey: "course.code",
    header: "Code",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.course.code}</span>
    ),
  },
  {
    id: "course.titleTh",
    accessorKey: "course.titleTh",
    header: "Name",
    cell: ({ row }) => <span>{row.original.course.titleTh}</span>,
  },
  {
    id: "group.name",
    accessorKey: "group.name",
    header: "Group",
    cell: ({ row }) => <span>{row.original.group.name}</span>,
  },
  {
    accessorKey: "course.credits",
    header: "Credits",
    cell: ({ row }) => (
      <div className="text-start">{row.original.course.credits}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ProgramCourseActions
        programId={programId}
        programCourseId={row.original.id}
      />
    ),
  },
];
