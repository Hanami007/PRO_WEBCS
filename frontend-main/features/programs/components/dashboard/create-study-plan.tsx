"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormInput, FormNumber, FormSelect } from "@/components/form";
import { SelectItem } from "@/components/ui/select";

import { useCourses } from "@/features/courses/api/get-courses";
import {
  CreateStudyPlanInput,
  createStudyPlanInputSchema,
  useCreateStudyPlan,
} from "../../api/create-study-plan";

type CreateStudyPlanProps = {
  programId: string;
  trigger: React.ReactNode;
};

export const CreateStudyPlan = ({
  programId,
  trigger,
}: CreateStudyPlanProps) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(createStudyPlanInputSchema),
    defaultValues: {
      courseId: "",
      label: "",
      year: 1,
      semester: 1,
      credit: 0,
    },
  });

  const createMutation = useCreateStudyPlan({
    programId,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Study plan added");
        setOpen(false);
        form.reset();
      },
      onError: () => {
        toast.error("Failed to add study plan");
      },
    },
  });

  const coursesQuery = useCourses({ limit: 1000 });

  const onSubmit = (values: CreateStudyPlanInput) => {
    const data = {
      ...values,
      courseId: values.courseId === "none" ? "" : values.courseId,
    };
    createMutation.mutate({ data, programId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Study Plan Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormNumber control={form.control} name="year" label="Year" />
            <FormNumber
              control={form.control}
              name="semester"
              label="Semester"
            />
          </div>

          <FormSelect control={form.control} name="courseId" label="Course (Optional)">
             <SelectItem value="none">None</SelectItem>
            {coursesQuery.data?.data.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.code} - {course.titleTh}
              </SelectItem>
            ))}
          </FormSelect>

          <FormInput
            control={form.control}
            name="label"
            label="Label (if no course)"
          />

          <FormNumber
            control={form.control}
            name="credit"
            label="Credits (if no course)"
          />

          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Adding..." : "Add Entry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
