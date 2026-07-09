"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";
import { useDeleteCourse } from "../../api/delete-course";
import { toast } from "sonner";

type DeleteCourseProps = {
  id: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
};

export const DeleteCourse = ({ id, open, onOpenChange, onSuccess }: DeleteCourseProps) => {
  const deleteCourseMutation = useDeleteCourse({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Course Deleted");
        onOpenChange?.(false);
        onSuccess?.();
      },
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            course and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteCourseMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={deleteCourseMutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              deleteCourseMutation.mutate({ courseId: id });
            }}
          >
            {deleteCourseMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
