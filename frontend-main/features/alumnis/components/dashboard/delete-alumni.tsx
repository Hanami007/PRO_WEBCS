"use client";

import React from "react";
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
import { useDeleteAlumni } from "../../api/delete-alumni";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

type DeleteAlumniProps = {
  id: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
};

export const DeleteAlumni = ({
  id,
  open: propOpen,
  onOpenChange,
  onSuccess,
}: DeleteAlumniProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const open = propOpen !== undefined ? propOpen : internalOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

  const deleteAlumniMutation = useDeleteAlumni({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Alumni deleted successfully.");
        setOpen(false);
        onSuccess?.();
      },
    },
  });

  return (
    <>
      {propOpen === undefined && (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
          className="gap-2"
        >
          <Trash2Icon size={16} />
          <span>Delete Alumni</span>
        </Button>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              alumni data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteAlumniMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteAlumniMutation.isPending}
              onClick={(e) => {
                e.preventDefault();
                deleteAlumniMutation.mutate({ id });
              }}
            >
              {deleteAlumniMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
