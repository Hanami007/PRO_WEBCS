import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getProgramQueryOptions } from "./get-program";

export const deleteProgramCourse = ({
  programCourseId,
}: {
  programCourseId: string;
}): Promise<void> => {
  return api.delete(`/program-courses/${programCourseId}`);
};

type UseDeleteProgramCourseOptions = {
  programId: string;
  mutationConfig?: MutationConfig<typeof deleteProgramCourse>;
};

export const useDeleteProgramCourse = ({
  programId,
  mutationConfig,
}: UseDeleteProgramCourseOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProgramQueryOptions(programId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteProgramCourse,
  });
};
