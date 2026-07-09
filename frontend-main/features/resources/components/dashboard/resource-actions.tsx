"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Resource } from "../../types/api";
import { DeleteResource } from "./delete-resource";
import { UpdateResourceDialog } from "./update-resource-dialog";

export const ResourceActions = ({ resource }: { resource: Resource }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const coreKeys = ["youtube", "facebook", "line", "intro-video", "apply-now"];
  const canDelete = !coreKeys.includes(resource.key);

  return (
    <>
      <DeleteResource
        id={resource.id}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />

      <UpdateResourceDialog
        resource={resource}
        open={editOpen}
        onOpenChange={setEditOpen}
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
            onClick={() => setEditOpen(true)}
            className="flex justify-between cursor-pointer"
          >
            <span>Edit</span>
            <Edit size={18} />
          </DropdownMenuItem>
          {canDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setIsDeleteOpen(true)}
                className="flex justify-between text-destructive focus:text-destructive"
              >
                <span>Delete</span>
                <Trash2 size={18} />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
