import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getProgramQueryOptions } from "./get-program";
import { ProgramCourse } from "../types/api";

export const createProgramCourseInputSchema = z.object({
  courseId: z.string().min(1, "Required"),
  groupId: z.string().min(1, "Required"),
});

export type CreateProgramCourseInput = z.infer<
  typeof createProgramCourseInputSchema
>;

export const createProgramCourse = ({
  data,
  programId,
}: {
  data: CreateProgramCourseInput;
  programId: string;
}): Promise<ProgramCourse> => {
  return api.post(`/program-courses`, {
    program: { id: programId },
    course: { id: data.courseId },
    group: { id: data.groupId },
  });
};

type UseCreateProgramCourseOptions = {
  programId: string;
  mutationConfig?: MutationConfig<typeof createProgramCourse>;
};

export const useCreateProgramCourse = ({
  programId,
  mutationConfig,
}: UseCreateProgramCourseOptions) => {
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
    mutationFn: createProgramCourse,
  });
};
