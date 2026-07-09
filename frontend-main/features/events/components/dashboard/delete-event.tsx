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
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import { useDeleteEvent } from "../../api/delete-event";

type DeleteEventProps = {
  id: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const DeleteEvent = ({
  id,
  open: propOpen,
  onOpenChange,
}: DeleteEventProps) => {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = React.useState(false);

  const open = propOpen !== undefined ? propOpen : internalOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

  const deleteEventMutation = useDeleteEvent({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Event Deleted");
        setOpen(false);
        router.push(paths.dashboard.events.getHref());
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
          <span>Delete Event</span>
        </Button>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              event and remove your event data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                deleteEventMutation.mutate({ eventId: id });
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteEventMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
