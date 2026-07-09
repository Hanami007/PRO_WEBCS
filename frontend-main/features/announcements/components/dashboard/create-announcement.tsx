"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateAnnouncementInput,
  createAnnouncementInputSchema,
  useCreateAnnouncement,
} from "../../api/create-announcement";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnnouncementStatus, AnnouncementType } from "../../types/api";
import { toast } from "sonner";
import { useUser } from "@/lib/auth";
import { canCreateAnnouncement } from "@/lib/authorization";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Dialog,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Plus } from "lucide-react";
import { FormDatePicker, FormInput, FormSelect } from "@/components/form";
import { SelectItem } from "@/components/ui/select";

const CreateAnnouncement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateAnnouncementInput>({
    resolver: zodResolver(createAnnouncementInputSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      linkLabel: "",
      type: AnnouncementType.INFO,
      status: AnnouncementStatus.DRAFT,
      publishedAt: new Date(),
      expiresAt: new Date(),
    },
  });

  const createAnnouncementMutation = useCreateAnnouncement({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Announcement created.");
        form.reset();
        setIsOpen(false);
      },
    },
  });

  const user = useUser();

  if (!canCreateAnnouncement(user?.data)) {
    return null;
  }

  const onSubmit = (values: CreateAnnouncementInput) => {
    createAnnouncementMutation.mutate({ data: values });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Announcement</DialogTitle>
          <DialogDescription>Create a new Announcement</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormInput control={form.control} name="title" label="Title" />

            <FormInput
              control={form.control}
              name="description"
              label="Description"
            />

            <FormInput control={form.control} name="link" label="Link" />

            <FormInput
              control={form.control}
              name="linkLabel"
              label="Link Label"
              description="A display text for link"
            />

            <FormSelect control={form.control} name="type" label="Type">
              <SelectItem value={AnnouncementType.INFO}>Information</SelectItem>
              <SelectItem value={AnnouncementType.NEW_FEATURE}>
                New Feature
              </SelectItem>
              <SelectItem value={AnnouncementType.URGENT}>Urgent</SelectItem>
              <SelectItem value={AnnouncementType.WARNING}>Warning</SelectItem>
            </FormSelect>

            <FormDatePicker
              control={form.control}
              name="publishedAt"
              label="วันเริ่มใช้"
            />

            <FormDatePicker
              control={form.control}
              name="expiresAt"
              label="วันหมดอายุ"
            />

            <DialogFooter>
              <Button type="submit">Create</Button>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncement;
