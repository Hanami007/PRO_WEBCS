"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Testimonial } from "../../types/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UpdateTestimonialInfoForm,
  UploadTestimonialImageForm,
} from "./update-testimonial";

type UpdateTestimonialDialogProps = {
  testimonial: Testimonial;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UpdateTestimonialDialog = ({
  testimonial,
  open,
  onOpenChange,
}: UpdateTestimonialDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit testimonial</DialogTitle>
          <DialogDescription>
            Update testimonial details and image.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">General</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="py-4">
            <UpdateTestimonialInfoForm testimonial={testimonial} />
          </TabsContent>
          <TabsContent value="image" className="py-4">
            <UploadTestimonialImageForm testimonial={testimonial} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTestimonialDialog;
