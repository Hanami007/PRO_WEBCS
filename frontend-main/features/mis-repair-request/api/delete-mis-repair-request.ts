import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMisRepairRequestsQueryOptions } from "./get-mis-repair-requests";

export const deleteMisRepairRequest = ({ id }: { id: string }): Promise<void> =>
  api.delete(`/mis-repair-request/${id}`);

type UseOptions = { mutationConfig?: MutationConfig<typeof deleteMisRepairRequest> };

export const useDeleteMisRepairRequest = ({ mutationConfig }: UseOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: deleteMisRepairRequest,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getMisRepairRequestsQueryOptions().queryKey });
      onSuccess?.(...args);
    },
  });
};
