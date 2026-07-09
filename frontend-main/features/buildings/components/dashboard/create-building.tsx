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
  createBuildingInputSchema,
  useCreateBuilding,
  CreateBuildingInput,
} from "../../api/create-building";
import { FormInput } from "@/components/form";
import { useBuildings } from "../../api/get-buildings";
import { FieldGroup, FieldSet } from "@/components/ui/field";

export const CreateBuilding = () => {
  const [open, setOpen] = useState(false);

  const { data: buildingsResponse } = useBuildings({ limit: 100 });
  const existingBuildings = buildingsResponse?.data || [];

  const createBuildingMutation = useCreateBuilding({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Building created successfully.");
        setOpen(false);
        form.reset();
      },
      onError: () => {
        toast.error("Failed to create building.");
      },
    },
  });

  const form = useForm<CreateBuildingInput>({
    resolver: zodResolver(createBuildingInputSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: CreateBuildingInput) => {
    const isDuplicate = existingBuildings.some(
      (b) => b.name.toLowerCase().trim() === values.name.toLowerCase().trim(),
    );

    if (isDuplicate) {
      toast.error("Building with this name already exists.");
      form.setError("name", {
        type: "manual",
        message: "Building name already exists.",
      });
      return;
    }

    createBuildingMutation.mutate({ data: values });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Building
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Building</DialogTitle>
          <DialogDescription>Create a new building.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <FieldSet>
              <FormInput
                control={form.control}
                name="name"
                label="Building Name"
              />
            </FieldSet>
          </FieldGroup>

          <DialogFooter>
            <Button type="submit" disabled={createBuildingMutation.isPending}>
              Create
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
