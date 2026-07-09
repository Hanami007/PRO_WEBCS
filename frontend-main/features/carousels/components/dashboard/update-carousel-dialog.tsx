"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel } from "../../types/api";
import {
  UpdateCarouselInfoForm,
  UploadCarouselImageForm,
} from "./update-carousel";

type UpdateCarouselDialogProps = {
  carousel: Carousel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UpdateCarouselDialog = ({
  carousel,
  open,
  onOpenChange,
}: UpdateCarouselDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Carousel</DialogTitle>
          <DialogDescription>
            Update carousel details and image.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">General</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="py-4">
            <UpdateCarouselInfoForm carousel={carousel} />
          </TabsContent>
          <TabsContent value="image" className="py-4">
            <UploadCarouselImageForm carousel={carousel} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
