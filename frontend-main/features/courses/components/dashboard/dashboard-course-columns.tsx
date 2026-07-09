"use client";

import { Course } from "@/features/courses/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { CourseActions } from "./course-actions";
import { Badge } from "@/components/ui/badge";

export const coursesColumns: ColumnDef<Course>[] = [
  {
    accessorKey: "code",
    header: "Code",
    size: 100,
  },
  {
    accessorKey: "titleTh",
    header: "Name (TH)",
    size: 350,
    cell: ({ row }) => (
      <div className="font-medium truncate max-w-[350px]">{row.getValue("titleTh")}</div>
    ),
  },
  {
    accessorKey: "credits",
    header: () => <div className="text-center">Credits</div>,
    size: 100,
    cell: ({ row }) => {
        const { credits, lectureHours, labHours, selfStudyHours } = row.original;
        return (
            <div className="flex flex-col items-center justify-center w-full">
                <span className="font-medium text-center">{credits}</span>
                <span className="text-[10px] text-muted-foreground text-center">({lectureHours}-{labHours}-{selfStudyHours})</span>
            </div>
        )
    }
  },
  {
    accessorKey: "isActive",
    header: () => <div className="text-center">Status</div>,
    size: 100,
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <div className="flex justify-center w-full">
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <CourseActions course={row.original} />,
  },
];
