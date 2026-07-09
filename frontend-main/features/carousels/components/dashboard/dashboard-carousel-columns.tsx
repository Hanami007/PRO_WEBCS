"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Carousel } from "../../types/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CarouselActions } from "./carousel-actions";
import { Badge } from "@/components/ui/badge";

export const carouselColumns: ColumnDef<Carousel>[] = [
  {
    accessorKey: "image",
    header: "Image",
    size: 150,
    cell: ({ row }) => {
      return (
        <Avatar className="h-10 w-16 rounded-none">
          <AvatarImage
            src={row.original.image?.url}
            alt={row.original.title}
            className="object-cover"
          />
          <AvatarFallback>
            {row.original.title.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 400,
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "sortOrder",
    header: "Order",
    size: 100,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    size: 120,
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date and time",
    size: 180,
    cell: ({ row }) => {
      const dateString = row.original.createdAt;
      if (!dateString) return "-";
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <CarouselActions carousel={row.original} />,
  },
];
