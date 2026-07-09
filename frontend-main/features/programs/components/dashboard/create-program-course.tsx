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
import { FormSelect } from "@/components/form";
import { SelectItem } from "@/components/ui/select";

import { useCourses } from "@/features/courses/api/get-courses";
import { useCourseGroups } from "@/features/courses/api/get-course-groups";
import {
  CreateProgramCourseInput,
  createProgramCourseInputSchema,
  useCreateProgramCourse,
} from "../../api/create-program-course";
import { CourseGroup } from "@/features/courses/types/api";

type CreateProgramCourseProps = {
  programId: string;
  trigger: React.ReactNode;
};

const flattenGroups = (
  groups: CourseGroup[],
  prefix = "",
): { id: string; name: string }[] => {
  let result: { id: string; name: string }[] = [];
  groups.forEach((group) => {
    const fullName = prefix ? `${prefix} > ${group.name}` : group.name;
    if (group.children && group.children.length > 0) {
      result = result.concat(flattenGroups(group.children, fullName));
    } else {
      result.push({ id: group.id, name: fullName });
    }
  });
  return result;
};

const buildHierarchy = (flatGroups: CourseGroup[]): CourseGroup[] => {
  const groupMap = new Map<string, CourseGroup>();

  // Initialize map and clear children to rebuild them from the flat list
  flatGroups.forEach((g) => {
    groupMap.set(g.id, { ...g, children: [] });
  });

  const roots: CourseGroup[] = [];

  flatGroups.forEach((g) => {
    const node = groupMap.get(g.id);
    if (!node) return;

    if (g.parent && groupMap.has(g.parent.id)) {
      const parentNode = groupMap.get(g.parent.id);
      parentNode?.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
};

export const CreateProgramCourse = ({
  programId,
  trigger,
}: CreateProgramCourseProps) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(createProgramCourseInputSchema),
    defaultValues: { courseId: "", groupId: "" },
  });

  const createMutation = useCreateProgramCourse({
    programId,
    mutationConfig: {
      onSuccess: () => {
        toast.success("Course added to program");
        setOpen(false);
        form.reset();
      },
      onError: () => {
        toast.error("Failed to add course");
      },
    },
  });

  const coursesQuery = useCourses({ limit: 1000 });
  const groupsQuery = useCourseGroups();

  const selectableGroups = React.useMemo(() => {
    if (!groupsQuery.data) return [];
    // Rebuild the hierarchy from the flat list to ensure deep nesting is preserved
    const hierarchy = buildHierarchy(groupsQuery.data);
    return flattenGroups(hierarchy);
  }, [groupsQuery.data]);

  const onSubmit = (values: CreateProgramCourseInput) => {
    createMutation.mutate({ data: values, programId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormSelect control={form.control} name="courseId" label="Course">
            {coursesQuery.data?.data.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.code} - {course.titleTh}
              </SelectItem>
            ))}
          </FormSelect>

          <FormSelect control={form.control} name="groupId" label="Group">
            {selectableGroups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}
              </SelectItem>
            ))}
          </FormSelect>

          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Adding..." : "Add Course"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
