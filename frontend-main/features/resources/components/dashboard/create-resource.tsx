"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormTextarea } from "@/components/form";
import {
  createResourceInputSchema,
  useCreateResource,
} from "../../api/create-resource";

import { Plus } from "lucide-react";

export const CreateResource = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<z.infer<typeof createResourceInputSchema>>({
    resolver: zodResolver(createResourceInputSchema),
    defaultValues: {
      key: "",
      value: "",
      description: "",
    },
  });

  const createResourceMutation = useCreateResource({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Resource has been created.");
        form.reset();
        setIsOpen(false);
      },
    },
  });

  const onSubmit = (values: z.infer<typeof createResourceInputSchema>) => {
    createResourceMutation.mutate({ data: values });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Resource
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Resource</DialogTitle>
          <DialogDescription>Create a new resource link</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            control={form.control}
            name="key"
            label="Name"
            description="This is a unique key for identifying resources"
          />
          <FormInput
            control={form.control}
            name="value"
            label="Value"
            description="The actual value that will be used"
          />

          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
            description="A note of what this resources is used for"
          />
          <DialogFooter>
            <Button type="submit" disabled={createResourceMutation.isPending}>
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
