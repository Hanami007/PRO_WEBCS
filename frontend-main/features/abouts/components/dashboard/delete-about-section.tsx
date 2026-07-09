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
import { toast } from "sonner";
import { useDeleteAboutSection } from "../../api/delete-about-section";

type DeleteAboutSectionProps = {
  id: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
};

const DeleteAboutSection = ({ id, open, onOpenChange, onSuccess }: DeleteAboutSectionProps) => {
  const deleteAboutSectionMutation = useDeleteAboutSection({
    mutationConfig: {
      onSuccess: () => {
        toast.success("About Section Deleted");
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
            about section and remove your section data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteAboutSectionMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              deleteAboutSectionMutation.mutate({ id });
            }}
            disabled={deleteAboutSectionMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteAboutSectionMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAboutSection;