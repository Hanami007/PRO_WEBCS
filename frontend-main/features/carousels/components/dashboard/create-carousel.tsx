"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createCarouselInputSchema,
  useCreateCarousel,
  CreateCarouselInput,
} from "@/features/carousels/api/create-carousel";
import {
  FormCheckbox,
  FormFile,
  FormImagePreview,
  FormInput,
  FormTextarea,
} from "@/components/form";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import useFilePreview from "@/hooks/use-file-preview";

export const CreateCarousel = () => {
  const [open, setOpen] = useState(false);

  const createCarouselMutation = useCreateCarousel({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Carousel created successfully.");
        setOpen(false);
        form.reset();
      },
      onError: () => {
        toast.error("Failed to create carousel.");
      },
    },
  });

  const form = useForm<CreateCarouselInput>({
    resolver: zodResolver(createCarouselInputSchema),
    defaultValues: {
      title: "",
      description: "",
      isActive: false,
    },
  });

  const file = form.watch("file");
  const [filePreview] = useFilePreview(file ?? null);

  const onSubmit = async (values: CreateCarouselInput) => {
    const { file, ...data } = values;
    createCarouselMutation.mutate(
      { data, file },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Carousel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Carousel</DialogTitle>
          <DialogDescription>Upload a new slide image.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <FieldSet>
              <FormInput control={form.control} name="title" label="ชื่อภาพ" />

              <FormTextarea
                control={form.control}
                name="description"
                label="รายละเอียด"
              />

              <FormCheckbox
                control={form.control}
                name="isActive"
                label="เปิดใช้งาน"
              />

              <FormImagePreview file={filePreview} />
              <FormFile control={form.control} name="file" label="Image" />
            </FieldSet>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit" disabled={createCarouselMutation.isPending}>
              Create
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
