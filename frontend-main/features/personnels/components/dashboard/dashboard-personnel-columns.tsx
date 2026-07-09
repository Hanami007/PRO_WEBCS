"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Personnel } from "../../types/api";
import { PersonnelActions } from "./personnel-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const personnelsColumns: ColumnDef<Personnel>[] = [
  {
    accessorKey: "profileImage",
    header: "Profile",
    size: 80,
    cell: ({ row }) => {
      const image = row.original.profileImage;
      const imageUrl = image?.url.startsWith("http")
        ? image.url
        : image?.url
          ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"}${image.url}`
          : undefined;

      return (
        <Avatar className="h-10 w-10">
          <AvatarImage src={imageUrl} alt={row.original.fullnameTh} />
          <AvatarFallback>
            {row.original.fullnameEn?.substring(0, 2).toUpperCase() || "PN"}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "fullnameTh",
    header: "ชื่อ-นามสกุล",
    size: 150,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.fullnameTh}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.fullnameEn}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "อีเมล",
    size: 150,
  },
  {
    accessorKey: "academicPosition",
    header: "ตำแหน่งทางวิชาการ",
    size: 150,
  },
  {
    accessorKey: "workStatus",
    header: "สถานะการทำงาน",
    size: 80,
    cell: ({ row }) => (
      <Badge variant={"outline"}>{row.original.workStatus.name}</Badge>
    ),
  },
  {
    accessorKey: "personnelType",
    header: "ประเภทบุคลากร",
    size: 80,
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.personnelType}</Badge>
    ),
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <PersonnelActions personnel={row.original} />,
  },
];
