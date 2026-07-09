"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact } from "../../types/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UpdateContactInfoForm,
  UploadContactImageForm,
} from "./update-contact";

type UpdateContactDialogProps = {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UpdateContactDialog = ({
  contact,
  open,
  onOpenChange,
}: UpdateContactDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>
            Update contact details and image.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">General</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="py-4">
            <UpdateContactInfoForm contact={contact} />
          </TabsContent>
          <TabsContent value="image" className="py-4">
            <UploadContactImageForm contact={contact} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateContactDialog;
