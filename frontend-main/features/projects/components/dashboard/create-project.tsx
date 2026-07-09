"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectInputSchema,
  useCreateProject,
  CreateProjectInput,
} from "../../api/create-project";
import { SelectItem } from "@/components/ui/select";
import { usePersonnels } from "@/features/personnels/api/get-personnels";
import { Button } from "@/components/ui/button";
import { FormInput, FormSelect, FormTextarea } from "@/components/form";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { useUser } from "@/lib/auth";
import { canCreateProject } from "@/lib/authorization";

export const CreateProject = () => {
  const [open, setOpen] = useState(false);
  const { data: personnelData } = usePersonnels({ limit: 100 });
  const personnel = personnelData?.data || [];

  const createProjectMutation = useCreateProject({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Project created successfully.");
        setOpen(false);
        form.reset();
      },
    },
  });

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectInputSchema),
    defaultValues: {
      code: "",
      name: "",
      year: "",
      detail: "",
      editors: [{ value: "" }],
      chairmanId: "",
      director1Id: "",
      director2Id: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "editors",
  });

  const user = useUser();

  if (!canCreateProject(user?.data)) {
    return null;
  }

  const onSubmit = (values: CreateProjectInput) => {
    createProjectMutation.mutate({ data: values });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Add New Research Project</DialogTitle>
          <DialogDescription>
            Enter the research details and add team members.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6">
          <form
            id="create-project-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput control={form.control} name="code" label="Code" />

                <FormInput control={form.control} name="year" label="Year" />
              </div>

              <FormInput control={form.control} name="name" label="Title" />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <FieldLabel>Authors / Editors</FieldLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ value: "" })}
                  >
                    <Plus className="mr-1 h-3 w-3" /> Add Author
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <div className="flex-1">
                      <FormInput
                        control={form.control}
                        name={`editors.${index}.value`}
                      />
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="mt-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <FormSelect
                control={form.control}
                name="chairmanId"
                label="Chairman (Advisor)"
              >
                {personnel.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.fullnameTh}
                  </SelectItem>
                ))}
              </FormSelect>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  control={form.control}
                  name="director1Id"
                  label="Director 1 (Optional)"
                >
                  {personnel.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.fullnameTh}
                    </SelectItem>
                  ))}
                </FormSelect>

                <FormSelect
                  control={form.control}
                  name="director2Id"
                  label="Director 2 (Optional)"
                >
                  {personnel.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.fullnameTh}
                    </SelectItem>
                  ))}
                </FormSelect>
              </div>

              <FormTextarea
                control={form.control}
                name="detail"
                label="Details / Abstract"
              />
            </FieldGroup>
          </form>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            form="create-project-form"
            disabled={createProjectMutation.isPending}
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
