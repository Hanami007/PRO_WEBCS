"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Testimonial } from "../../types/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TestimonialActions } from "./testimonial-actions";
import { Badge } from "@/components/ui/badge";

export const testimonialColumns: ColumnDef<Testimonial>[] = [
  {
    accessorKey: "image",
    header: "Image",
    size: 80,
    cell: ({ row }) => {
      return (
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={row.original.image?.url}
            alt={row.original.authorName}
            className="object-cover"
          />
          <AvatarFallback>
            {row.original.authorName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "authorName",
    header: "Name",
    size: 250,
    cell: ({ row }) => <div className="font-medium">{row.getValue("authorName")}</div>,
  },
  {
    accessorKey: "authorTitle",
    header: "Position",
    size: 250,
  },
  {
    accessorKey: "isActive",
    header: () => <div className="text-center">Status</div>,
    size: 100,
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
    accessorKey: "createdAt",
    header: () => <div className="text-center">Date</div>,
    size: 150,
    cell: ({ row }) => {
      const dateString = row.original.createdAt;
      if (!dateString) return <div className="text-center">-</div>;
      const date = new Date(dateString);
      return (
        <div className="text-center text-sm text-muted-foreground">
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
    cell: ({ row }) => <TestimonialActions testimonial={row.original} />,
  },
];
