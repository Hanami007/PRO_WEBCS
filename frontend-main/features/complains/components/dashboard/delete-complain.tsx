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
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useDeleteComplain } from "../../api/delete-complain";
import { toast } from "sonner";

type DeleteComplainProps = {
  id: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const DeleteComplain = ({ id, open: propOpen, onOpenChange }: DeleteComplainProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  
  const open = propOpen !== undefined ? propOpen : internalOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

  const deleteComplainMutation = useDeleteComplain({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Complain deleted successfully");
        setOpen(false);
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
          <span>Delete</span>
        </Button>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              complain record from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteComplainMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                deleteComplainMutation.mutate({ id });
              }}
              disabled={deleteComplainMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteComplainMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
