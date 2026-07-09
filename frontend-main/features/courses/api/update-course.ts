import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Course } from "@/features/courses/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getCourseQueryOption } from "./get-course";

export const updateCourseInputSchema = z.object({
  code: z.string().min(1, "Required"),
  titleTh: z.string().min(1, "Required"),
  titleEn: z.string().min(1, "Required"),
  description: z.string().optional(),
  credits: z.coerce.number().optional(),
  lectureHours: z.coerce.number().optional(),
  labHours: z.coerce.number().optional(),
  selfStudyHours: z.coerce.number().optional(),
  isActive: z.boolean().optional(),
});

export type UpdateCourseInput = z.infer<typeof updateCourseInputSchema>;

export const updateCourse = ({
  data,
  courseId,
}: {
  data: UpdateCourseInput;
  courseId: string;
}): Promise<Course> => {
  return api.patch(`/courses/${courseId}`, data);
};

type UseUpdateCourseOptions = {
  mutationConfig?: MutationConfig<typeof updateCourse>;
};

export const useUpdateCourse = ({
  mutationConfig,
}: UseUpdateCourseOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getCourseQueryOption(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateCourse,
  });
};
