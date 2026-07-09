import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getProgramQueryOptions } from "./get-program";

export const deleteStudyPlan = ({
  studyPlanId,
}: {
  studyPlanId: string;
}): Promise<void> => {
  return api.delete(`/study-plan/${studyPlanId}`);
};

type UseDeleteStudyPlanOptions = {
  programId: string;
  mutationConfig?: MutationConfig<typeof deleteStudyPlan>;
};

export const useDeleteStudyPlan = ({
  programId,
  mutationConfig,
}: UseDeleteStudyPlanOptions) => {
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
    mutationFn: deleteStudyPlan,
  });
};
