"use client";

import { useState } from "react";
import { useCourse } from "../../api/get-course";
import { useUser } from "@/lib/auth";
import { canUpdateCourse } from "@/lib/authorization";
import {
  UpdateCourseInput,
  updateCourseInputSchema,
  useUpdateCourse,
} from "../../api/update-course";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
  FieldSet,
  FieldLegend,
  FieldSeparator,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course } from "@/features/courses/types/api";
import { DeleteCourse } from "./delete-course";
import { FormInput, FormTextarea, FormNumber } from "@/components/form";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import { Spinner } from "@/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { UnauthorisedError } from "@/features/errors/unauthorized-error";

type UpdateCourseProps = {
  courseId: string;
};

const UpdateCourseInfoForm = ({ course }: { course: Course }) => {
  const courseId = course.id;

  const updateCourseMutation = useUpdateCourse({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Course Information is updated.");
      },
    },
  });

  const form = useForm({
    resolver: zodResolver(updateCourseInputSchema),
    defaultValues: {
      code: course.code ?? "",
      titleTh: course.titleTh ?? "",
      titleEn: course.titleEn ?? "",
      description: course.description ?? "",
      credits: course.credits ?? 0,
      lectureHours: course.lectureHours ?? 0,
      labHours: course.labHours ?? 0,
      selfStudyHours: course.selfStudyHours ?? 0,
    },
  });

  const onSubmit = (values: UpdateCourseInput) => {
    updateCourseMutation.mutate({ data: values, courseId });
  };

  const user = useUser();

  if (!canUpdateCourse(user?.data)) {
    return <UnauthorisedError />;
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>General Information</FieldLegend>
            <FieldDescription>Basic course info.</FieldDescription>

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

            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
            />

            <FormNumber control={form.control} name="credits" label="Credits" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormNumber
                control={form.control}
                name="lectureHours"
                label="Lecture Hours"
              />
              <FormNumber
                control={form.control}
                name="labHours"
                label="Lab Hours"
              />
              <FormNumber
                control={form.control}
                name="selfStudyHours"
                label="Self Study Hours"
              />
            </div>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit" disabled={updateCourseMutation.isPending}>
              {updateCourseMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

const CourseControlForm = ({ course }: { course: Course }) => {
  const courseId = course.id;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateCourseMutation = useUpdateCourse({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Course settings updated.");
      },
    },
  });

  const form = useForm({
    resolver: zodResolver(updateCourseInputSchema),
    defaultValues: {
      code: course.code ?? "",
      titleTh: course.titleTh ?? "",
      titleEn: course.titleEn ?? "",
      description: course.description ?? "",
      credits: course.credits ?? 0,
      lectureHours: course.lectureHours ?? 0,
      labHours: course.labHours ?? 0,
      selfStudyHours: course.selfStudyHours ?? 0,
      isActive: course.isActive ?? false,
    },
  });

  const onSubmit = (values: UpdateCourseInput) => {
    updateCourseMutation.mutate({ data: values, courseId });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Course Settings</FieldLegend>
            <FieldDescription>Manage visibility and status.</FieldDescription>

            <Controller
              control={form.control}
              name="isActive"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor={field.name}>Active</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit" disabled={updateCourseMutation.isPending}>
              {updateCourseMutation.isPending ? "Saving..." : "Save Visibility"}
            </Button>
          </Field>

          <FieldSeparator />

          <FieldSet>
            <FieldLegend>Course Control</FieldLegend>
            <FieldDescription>
              Delete or deactivate your course.
            </FieldDescription>

            <Field orientation="horizontal">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Delete Course</span>
                <span className="text-xs text-muted-foreground">
                  This action cannot be undone.
                </span>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteOpen(true);
                }}
              >
                Delete
              </Button>
            </Field>

            <DeleteCourse
              id={courseId}
              open={deleteOpen}
              onOpenChange={setDeleteOpen}
              onSuccess={() => {
                queryClient.removeQueries({ queryKey: ["courses"] });
                router.push(paths.dashboard.courses.getHref());
              }}
            />
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

export const UpdateCourse = ({ courseId }: UpdateCourseProps) => {
  const router = useRouter();
  const courseQuery = useCourse(courseId);

  const course = courseQuery.data;

  if (courseQuery.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!course) {
    return <div className="p-8 text-destructive">Course not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit -ml-2 text-muted-foreground"
          onClick={() => router.push(paths.dashboard.courses.getHref())}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        <div className="flex flex-col">
          <p className="text-2xl font-medium">Edit Course</p>
          <p className="text-muted-foreground text-sm">
            Update course details and credits.
          </p>
        </div>
      </div>
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="py-6 space-y-8">
          <UpdateCourseInfoForm course={course} />
        </TabsContent>
        <TabsContent value="control" className="py-6">
          <CourseControlForm course={course} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpdateCourse;
