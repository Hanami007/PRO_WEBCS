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
import { useDeleteRoom } from "../../api/delete-room";

type DeleteRoomProps = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export const DeleteRoom = ({ id, open, onOpenChange, onSuccess }: DeleteRoomProps) => {
  const deleteRoomMutation = useDeleteRoom({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Room deleted successfully.");
        onOpenChange(false);
        onSuccess?.();
      },
       onError: () => {
           toast.error("Failed to delete room.");
      }
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the room.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteRoomMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={deleteRoomMutation.isPending}
            onClick={(e) => {
                e.preventDefault();
                deleteRoomMutation.mutate({ id });
            }}
          >
            {deleteRoomMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
