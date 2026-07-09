"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Room } from "../../types/api";
import { UpdateRoomInfoForm, UpdateRoomImageForm } from "./update-room";

type UpdateRoomDialogProps = {
  room: Room;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UpdateRoomDialog = ({
  room,
  open,
  onOpenChange,
}: UpdateRoomDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
          <DialogDescription>Update room details and image.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">General</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="py-4">
            <UpdateRoomInfoForm room={room} />
          </TabsContent>
          <TabsContent value="image" className="py-4">
            <UpdateRoomImageForm room={room} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
