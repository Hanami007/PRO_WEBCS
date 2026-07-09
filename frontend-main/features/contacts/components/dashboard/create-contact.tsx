"use client";

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
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContactInputSchema,
  useCreateContact,
  CreateContactInput,
} from "../../api/create-contact";
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/form";
import { CONTACT_TYPES } from "../../types/api";
import { SelectItem } from "@/components/ui/select";
import { FieldGroup } from "@/components/ui/field";

export const CreateContact = () => {
  const [open, setOpen] = useState(false);

  const createContactMutation = useCreateContact({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Contact created successfully.");
        setOpen(false);
      },
      onError: () => {
        toast.error("Failed to create contact.");
      },
    },
  });

  const form = useForm<CreateContactInput>({
    resolver: zodResolver(createContactInputSchema),
    defaultValues: {
      title: "",
      description: "",
      type: CONTACT_TYPES[0],
      value: "",
      label: "",
      sortOrder: 0,
      isActive: true,
    },
  });

  const onSubmit = (values: CreateContactInput) => {
    createContactMutation.mutate({ data: values });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Contact Info</DialogTitle>
          <DialogDescription>Add new contact details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <FormInput control={form.control} name="title" label="Name" />

            <FormSelect control={form.control} name="type" label="Contact Type">
              {CONTACT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </FormSelect>

            <FormInput control={form.control} name="value" label="Value" />

            <FormInput control={form.control} name="label" label="Label" />

            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
            />

            <FormCheckbox
              control={form.control}
              name="isActive"
              label="Is Active"
            />

            <DialogFooter>
              <Button type="submit" disabled={createContactMutation.isPending}>
                Create
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
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
