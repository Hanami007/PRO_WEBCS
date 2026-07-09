"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StudyPlan } from "@/features/programs/types/api";
import { ProgramStudyPlanActions } from "./program-study-plan-actions";

export const getProgramStudyPlanColumns = (
  programId: string,
): ColumnDef<StudyPlan>[] => [
  {
    id: "year",
    accessorKey: "year",
    header: "Year",
  },
  {
    id: "semester",
    accessorKey: "semester",
    header: "Semester",
  },
  {
    id: "course.code",
    accessorKey: "course.code",
    header: "Code",
    cell: ({ row }) => (
      <span>{row.original.course?.code || "-"}</span>
    ),
  },
  {
    id: "label",
    accessorKey: "label",
    header: "Title",
    cell: ({ row }) => (
      <span>{row.original.course?.titleTh || row.original.label}</span>
    ),
  },
  {
    id: "credit",
    accessorKey: "credit",
    header: "Credits",
    cell: ({ row }) => (
      <span>{row.original.course?.credits || row.original.credit}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ProgramStudyPlanActions
        programId={programId}
        studyPlanId={row.original.id}
      />
    ),
  },
];
