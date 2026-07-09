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
  createAlumniInputSchema,
  useCreateAlumni,
  CreateAlumniInput,
} from "../../api/create-alumni";
import { useUser } from "@/lib/auth";
import { canCreateAlumni } from "@/lib/authorization";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { FormInput, FormTextarea } from "@/components/form";

export const CreateAlumni = () => {
  const [open, setOpen] = useState(false);
  const createAlumniMutation = useCreateAlumni({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Alumni created successfully.");
        setOpen(false);
      },
    },
  });

  const form = useForm<CreateAlumniInput>({
    resolver: zodResolver(createAlumniInputSchema),
    defaultValues: {
      fullName: "",
      cohort: "",
      workplace: "",
      position: "",
      quote: "",
    },
  });

  const onSubmit = (values: CreateAlumniInput) => {
    createAlumniMutation.mutate({ data: values });
  };

  const user = useUser();

  if (!canCreateAlumni(user?.data)) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          Create
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Alumni</DialogTitle>
          <DialogDescription>Enter details of the alumni.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <FieldSet>
              <FormInput
                control={form.control}
                name="fullName"
                label="ชื่อเต็ม"
              />

              <FormInput
                control={form.control}
                name="workplace"
                label="สถานที่ทำงาน"
              />

              <FormInput
                control={form.control}
                name="position"
                label="ตำแหน่งงาน"
              />

              <FormInput
                control={form.control}
                name="cohort"
                label="วิทย์คอมรุ่นที่"
                description="กรอกหมายเลขรุ่น เช่น 1, 14, 27"
              />

              <FormTextarea control={form.control} name="quote" label="Quote" />
            </FieldSet>
            <FieldSet>
              <DialogFooter>
                <Button type="submit" disabled={createAlumniMutation.isPending}>
                  Create
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </FieldSet>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};
