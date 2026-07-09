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
import { useDeleteBuilding } from "../../api/delete-building";

type DeleteBuildingProps = {
  id: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
};

export const DeleteBuilding = ({ id, open, onOpenChange, onSuccess }: DeleteBuildingProps) => {
  const deleteBuildingMutation = useDeleteBuilding({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Building deleted successfully.");
        onOpenChange?.(false);
        onSuccess?.();
      },
       onError: () => {
           toast.error("Failed to delete building.");
      }
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the building.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteBuildingMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={deleteBuildingMutation.isPending}
            onClick={(e) => {
                e.preventDefault();
                deleteBuildingMutation.mutate({ id });
            }}
          >
            {deleteBuildingMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
