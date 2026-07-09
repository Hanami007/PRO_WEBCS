"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AboutContent, AboutSection } from "../../types/api";
import { AboutSectionActions } from "./about-section-actions";

export const aboutSectionsColumns: ColumnDef<AboutSection>[] = [
  {
    accessorKey: "sortOrder",
    header: "Order",
    size: 80,
  },
  {
    accessorKey: "title",
    header: "Section Name",
    size: 450,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "contents",
    header: "Contents",
    size: 120,
    cell: ({ row }) => {
      const contents = row.getValue<AboutContent[]>("contents");
      return <div>{contents?.length ?? 0}</div>;
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => <AboutSectionActions aboutSection={row.original} />,
  },
];
