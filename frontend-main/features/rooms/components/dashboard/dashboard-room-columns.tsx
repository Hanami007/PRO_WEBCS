"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Room } from "@/features/rooms/types/api";
import { RoomActions } from "./room-actions";

export const roomsColumns: ColumnDef<Room>[] = [
  {
    accessorKey: "code",
    header: "Code",
    size: 100,
    cell: ({ row }) => <span className="font-bold">{row.original.code}</span>
  },
  {
    accessorKey: "nameTh",
    header: "Room Name (TH)",
    size: 250,
    cell: ({ row }) => <span className="font-medium">{row.original.nameTh}</span>
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 120,
    cell: ({ row }) => <span>{row.original.type?.name || "-"}</span>
  },
  {
    accessorKey: "building",
    header: "Building",
    size: 200,
    cell: ({ row }) => <span>{row.original.building?.name || "-"}</span>
  },
  {
    accessorKey: "floor",
    header: () => <div className="text-center">Floor</div>,
    size: 80,
    cell: ({ row }) => <div className="text-center">{row.original.floor}</div>
  },
  {
    accessorKey: "capacity",
    header: () => <div className="text-center">Seats</div>,
    size: 100,
    cell: ({ row }) => <div className="text-center">{row.original.capacity}</div>
  },
  {
    accessorKey : "personnel",
    header: "Admin",
    size: 200,
    cell: ({ row }) => <span>{row.original.personnel?.fullnameTh || "-"}</span>
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <RoomActions room={row.original} />,
  },
];
