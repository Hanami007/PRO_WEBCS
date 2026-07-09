"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "../../types/api";
import { ContactActions } from "./contact-actions";
import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";

export const contactColumns: ColumnDef<Contact>[] = [
  {
    accessorKey: "sortOrder",
    header: () => <div className="text-center">Order</div>,
    size: 80,
    cell: ({ row }) => (
      <div className="text-center">{row.original.sortOrder}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 250,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 300,
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 120,
  },
  {
    accessorKey: "isActive",
    header: () => <div className="text-center">Status</div>,
    size: 120,
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <div className="flex justify-center">
          <Badge variant="outline" className="px-1.5 text-muted-foreground">
            <CircleCheck
              className={
                isActive
                  ? "fill-green-500 dark:fill-green-400"
                  : "fill-slate-400 dark:fill-slate-500"
              }
            />
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <ContactActions contact={row.original} />,
  },
];
