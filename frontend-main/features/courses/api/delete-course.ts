import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCoursesQueryOptions } from "./get-courses";

export const deleteCourse = ({ courseId }: { courseId: string }) => {
  return api.delete(`/courses/${courseId}`);
};

type UseDeleteCourseOptions = {
  mutationConfig?: MutationConfig<typeof deleteCourse>;
};

export const useDeleteCourse = ({
  mutationConfig,
}: UseDeleteCourseOptions = {}) => {
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
    mutationFn: deleteCourse,
  });
};
