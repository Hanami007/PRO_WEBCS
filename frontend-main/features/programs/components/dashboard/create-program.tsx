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
import {
  createProgramInputSchema,
  useCreateProgram,
  CreateProgramInput,
} from "../../api/create-program";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormCheckbox } from "@/components/form";
import { Plus } from "lucide-react";

export const CreateProgram = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<CreateProgramInput>({
    resolver: zodResolver(createProgramInputSchema),
    defaultValues: {
      code: "",
      nameTh: "",
      nameEn: "",
      tqf: "",
      isCurrent: false,
      isActive: true,
    },
  });

  const createProgramMutation = useCreateProgram({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Program has been created.");
        form.reset();
        setIsOpen(false);
      },
    },
  });

  const onSubmit = (values: CreateProgramInput) => {
    createProgramMutation.mutate({ data: values });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          New Program
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>New Program</DialogTitle>
          <DialogDescription>Create a new program curriculum</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6">
          <form
            id="create-program-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormInput
              control={form.control}
              name="code"
              label="Curriculum Code"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="nameTh"
                label="Name (Thai)"
              />
              <FormInput
                control={form.control}
                name="nameEn"
                label="Name (English)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="degreeTh"
                label="Degree Abbreviation (Thai)"
              />
              <FormInput
                control={form.control}
                name="degreeEn"
                label="Degree Abbreviation (English)"
              />
            </div>

            <FormInput
              control={form.control}
              name="tqf"
              label="TQF Link (PDF URL)"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <FormCheckbox
                control={form.control}
                name="isCurrent"
                label="Current Curriculum"
                description="Set as the default curriculum"
              />
              <FormCheckbox
                control={form.control}
                name="isActive"
                label="Active Status"
                description="Visible on the public website"
              />
            </div>
          </form>
        </div>
        <DialogFooter className="px-6 pb-6 pt-4">
          <Button
            type="submit"
            form="create-program-form"
            disabled={createProgramMutation.isPending}
          >
            Create
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
