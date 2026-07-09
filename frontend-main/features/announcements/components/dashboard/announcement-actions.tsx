"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Announcement } from "../../types/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import DeleteAnnouncement from "./delete-announcement";

export const AnnouncementActions = ({
  announcement,
}: {
  announcement: Announcement;
}) => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DeleteAnnouncement
        id={announcement.id}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(paths.dashboard.announcement.getHref(announcement.id))
            }
            className="flex justify-between cursor-pointer"
          >
            <span>Edit</span>
            <Edit size={18} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(announcement.id)}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setIsDeleteOpen(true)}
            className="flex justify-between text-destructive focus:text-destructive cursor-pointer"
          >
            <span>Delete</span>
            <Trash2 size={18} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
