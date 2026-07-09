import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getProgramQueryOptions } from "./get-program";
import { StudyPlan } from "../types/api";

export const createStudyPlanInputSchema = z.object({
  courseId: z.string().optional().or(z.literal("")),
  label: z.string().optional(),
  year: z.coerce.number().min(1),
  semester: z.coerce.number().min(1),
  credit: z.coerce.number().optional(),
});

export type CreateStudyPlanInput = z.infer<typeof createStudyPlanInputSchema>;

export const createStudyPlan = ({
  data,
  programId,
}: {
  data: CreateStudyPlanInput;
  programId: string;
}): Promise<StudyPlan> => {
  return api.post(`/study-plans`, {
    program: { id: programId },
    course: data.courseId ? { id: data.courseId } : null,
    label: data.label,
    year: data.year,
    semester: data.semester,
    credit: data.credit,
  });
};

type UseCreateStudyPlanOptions = {
  programId: string;
  mutationConfig?: MutationConfig<typeof createStudyPlan>;
};

export const useCreateStudyPlan = ({
  programId,
  mutationConfig,
}: UseCreateStudyPlanOptions) => {
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
    mutationFn: createStudyPlan,
  });
};
