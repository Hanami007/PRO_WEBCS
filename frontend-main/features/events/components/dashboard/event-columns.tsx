"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Event } from "../../types/api";
import { EventActions } from "./event-actions";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";

export const eventColumns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 300,
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium truncate max-w-[300px]">{row.original.title}</span>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <MapPin size={10} />
          <span className="truncate max-w-[280px]">{row.original.location || "No location"}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "organizer",
    header: "Organizer",
    size: 150,
    cell: ({ row }) => <span className="text-sm">{row.original.organizer}</span>
  },
  {
    id: "schedule",
    header: "Date & Time",
    size: 250,
    cell: ({ row }) => {
      const startsAt = new Date(row.original.startsAt);
      const endsAt = row.original.endsAt ? new Date(row.original.endsAt) : null;
      
      const dateFormatter = new Intl.DateTimeFormat("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      
      const timeFormatter = new Intl.DateTimeFormat("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const isSameDay = endsAt && startsAt.toDateString() === endsAt.toDateString();

      return (
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-muted-foreground" />
            <span>
              {dateFormatter.format(startsAt)}
              {endsAt && !isSameDay && ` - ${dateFormatter.format(endsAt)}`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={14} />
            <span>
              {timeFormatter.format(startsAt)} น.
              {endsAt && ` - ${timeFormatter.format(endsAt)} น.`}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    size: 100,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <EventActions event={row.original} />,
  },
];
