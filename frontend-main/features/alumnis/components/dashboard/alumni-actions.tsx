"use client";

import React, { useState } from "react";
import { Alumni } from "../../types/api";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { DeleteAlumni } from "./delete-alumni";

type AlumniActionsProps = {
  alumni: Alumni;
};

export const AlumniActions = ({ alumni }: AlumniActionsProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <>
      <DeleteAlumni id={alumni.id} open={open} onOpenChange={setOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              router.push(paths.dashboard.alumni.getHref(alumni.id))
            }
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(alumni.id)}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            className="flex justify-between cursor-pointer text-destructive focus:text-destructive"
          >
            <span>Delete</span>
            <Trash2 size={18} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
