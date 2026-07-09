"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UpdateBuildingImageForm,
  UpdateBuildingInfoForm,
} from "./update-building";
import { Building } from "../../types/api";

type UpdateBuildingDialogProps = {
  building: Building;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UpdateBuildingDialog = ({
  building,
  open,
  onOpenChange,
}: UpdateBuildingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Building</DialogTitle>
          <DialogDescription>
            Update building details and image.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">General</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="py-4">
            <UpdateBuildingInfoForm building={building} />
          </TabsContent>
          <TabsContent value="image" className="py-4">
            <UpdateBuildingImageForm building={building} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
