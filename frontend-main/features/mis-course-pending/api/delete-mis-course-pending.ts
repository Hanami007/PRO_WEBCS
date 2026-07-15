import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMisCoursePendingsQueryOptions } from "./get-mis-course-pendings";

export const deleteMisCoursePending = ({ id }: { id: string }): Promise<void> => {
  return api.delete(`/mis-course-pending/${id}`);
};

type UseOptions = {
  mutationConfig?: MutationConfig<typeof deleteMisCoursePending>;
};

export const useDeleteMisCoursePending = ({ mutationConfig }: UseOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: deleteMisCoursePending,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getMisCoursePendingsQueryOptions().queryKey });
      onSuccess?.(...args);
    },
  });
};
