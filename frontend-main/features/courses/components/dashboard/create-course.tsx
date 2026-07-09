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
  createCourseInputSchema,
  useCreateCourse,
  CreateCourseInput,
} from "../../api/create-course";
import { useUser } from "@/lib/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/form";
import { Plus } from "lucide-react";
import { canCreateCourse } from "@/lib/authorization";

export const CreateCourse = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(createCourseInputSchema),
    defaultValues: {
      code: "",
      titleTh: "",
      titleEn: "",
    },
  });

  const createCourseMutation = useCreateCourse({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Course has been created.");
        form.reset();
        setIsOpen(false);
      },
    },
  });

  const onSubmit = (values: CreateCourseInput) => {
    createCourseMutation.mutate({ data: values });
  };

  const user = useUser();

  if (!canCreateCourse(user?.data)) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Create Course</DialogTitle>
          <DialogDescription>
            Add a new course by providing nesscessary info. Click save when
            you&apos;re done
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FieldGroup>
              <FormInput control={form.control} name="code" label="Code" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  control={form.control}
                  name="titleTh"
                  label="Title (TH)"
                />
                <FormInput
                  control={form.control}
                  name="titleEn"
                  label="Title (EN)"
                />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={createCourseMutation.isPending}>
                  Create
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
