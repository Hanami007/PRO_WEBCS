"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProjectActions } from "./project-actions";
import { FileText } from "lucide-react";
import { Project } from "../../types/api";

export const projectsColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "code",
    header: "Code",
    size: 100,
    cell: ({ row }) => <span className="font-bold">{row.original.code}</span>,
  },
  {
    accessorKey: "name",
    header: "Project Title",
    size: 400,
    cell: ({ row }) => (
      <span className="font-medium line-clamp-1">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "year",
    header: () => <div className="text-center">Year (BE)</div>,
    size: 100,
    cell: ({ row }) => <div className="text-center">{row.original.year}</div>,
  },
  {
    accessorKey: "chairman",
    header: "Chairman",
    size: 200,
    cell: ({ row }) => <span>{row.original.chairman?.fullnameTh || "-"}</span>,
  },
  {
    accessorKey: "file",
    header: () => <div className="text-center">PDF</div>,
    size: 80,
    cell: ({ row }) => {
      const file = row.original.file;
      if (!file)
        return <div className="text-center text-muted-foreground">-</div>;
      return (
        <div className="flex justify-center">
          <a
            href={file.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-primary hover:underline"
          >
            <FileText size={14} className="mr-1" /> PDF
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Date</div>,
    size: 150,
    cell: ({ row }) => {
      const dateString = row.original.createdAt;
      if (!dateString) return <div className="text-center">-</div>;
      const date = new Date(dateString);
      return (
        <div className="text-center text-muted-foreground">
          {new Intl.DateTimeFormat("en-GB", {
            dateStyle: "medium",
          }).format(date)}
        </div>
      );
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <ProjectActions project={row.original} />,
  },
];
