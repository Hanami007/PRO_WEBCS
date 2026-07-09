"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { MoreHorizontal, Trash2, Edit, Eye } from "lucide-react";
import { DeleteProject } from "./delete-project";
import { Project } from "../../types/api";

type ProjectActionsProps = {
  project: Project;
};

export const ProjectActions = ({ project }: ProjectActionsProps) => {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
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
              router.push(paths.project.getHref(project.id))
            }
            className="flex justify-between cursor-pointer"
          >
            <span>View Detail</span>
            <Eye size={18} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(paths.dashboard.project.getHref(project.id))
            }
            className="flex justify-between cursor-pointer"
          >
            <span>Edit</span>
            <Edit size={18} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(project.id)}
            className="cursor-pointer"
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setDeleteOpen(true)}
            className="flex justify-between cursor-pointer text-destructive focus:text-destructive"
          >
            <span>Delete</span>
            <Trash2 size={18} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteProject
        id={project.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
};
