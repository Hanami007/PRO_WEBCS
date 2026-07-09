"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@/features/courses/types/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { paths } from "@/config/paths";
import { DeleteCourse } from "./delete-course";

type CourseActionsProps = {
  course: Course;
};

export const CourseActions = ({ course }: CourseActionsProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <DeleteCourse 
        id={course.id} 
        open={open} 
        onOpenChange={setOpen} 
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
              router.push(paths.dashboard.course.getHref(course.id))
            }
            className="flex justify-between cursor-pointer"
          >
            <span>Edit</span>
            <Edit size={18} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(course.id)}
            className="cursor-pointer"
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setOpen(true)}
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
