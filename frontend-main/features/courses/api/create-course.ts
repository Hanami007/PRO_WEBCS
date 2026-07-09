import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Course } from "@/features/courses/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getCoursesQueryOptions } from "./get-courses";

export const createCourseInputSchema = z.object({
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

export type CreateCourseInput = z.infer<typeof createCourseInputSchema>;

export const createCourse = ({
  data,
}: {
  data: CreateCourseInput;
}): Promise<Course> => {
  return api.post(`/courses`, data);
};

type UseCreateCourseOptions = {
  mutationConfig?: MutationConfig<typeof createCourse>;
};

export const useCreateCourse = ({
  mutationConfig,
}: UseCreateCourseOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCoursesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createCourse,
  });
};
