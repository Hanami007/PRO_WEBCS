"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Resource } from "../../types/api";
import { UpdateResourceInfoForm } from "./update-resource";

type UpdateResourceDialogProps = {
  resource: Resource;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UpdateResourceDialog = ({
  resource,
  open,
  onOpenChange,
}: UpdateResourceDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Resource</DialogTitle>
          <DialogDescription>
            Update resource details and image.
          </DialogDescription>
        </DialogHeader>

        <UpdateResourceInfoForm resource={resource} />
      </DialogContent>
    </Dialog>
  );
};
