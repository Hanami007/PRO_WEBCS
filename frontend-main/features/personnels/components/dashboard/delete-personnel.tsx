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
import { toast } from "sonner";
import { useDeletePersonnel } from "../../api/delete-personnel";

type DeletePersonnelProps = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export const DeletePersonnel = ({
  id,
  open,
  onOpenChange,
  onSuccess,
}: DeletePersonnelProps) => {
  const deletePersonnelMutation = useDeletePersonnel({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Personnel deleted successfully.");
        onOpenChange(false);
        onSuccess?.();
      },
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            personnel data from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deletePersonnelMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={deletePersonnelMutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              deletePersonnelMutation.mutate({ personnelId: id });
            }}
          >
            {deletePersonnelMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
