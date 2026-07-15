import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CoursePendingStatus } from "../types/api";
import { getMisCoursePendingsQueryOptions } from "./get-mis-course-pendings";

export type UpdateMisCoursePendingInput = {
  status?: CoursePendingStatus;
};

export const updateMisCoursePending = ({
  id,
  data,
}: {
  id: string;
  data: UpdateMisCoursePendingInput;
}): Promise<void> => {
  return api.patch(`/mis-course-pending/${id}`, data);
};

type UseOptions = {
  mutationConfig?: MutationConfig<typeof updateMisCoursePending>;
};

export const useUpdateMisCoursePending = ({ mutationConfig }: UseOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: updateMisCoursePending,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getMisCoursePendingsQueryOptions().queryKey });
      onSuccess?.(...args);
    },
  });
};
