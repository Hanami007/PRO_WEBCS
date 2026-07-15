import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RepairRequestStatus } from "../types/api";
import { getMisRepairRequestsQueryOptions } from "./get-mis-repair-requests";

export type UpdateMisRepairRequestInput = { status?: RepairRequestStatus };

export const updateMisRepairRequest = ({ id, data }: { id: string; data: UpdateMisRepairRequestInput }): Promise<void> =>
  api.patch(`/mis-repair-request/${id}`, data);

type UseOptions = { mutationConfig?: MutationConfig<typeof updateMisRepairRequest> };

export const useUpdateMisRepairRequest = ({ mutationConfig }: UseOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: updateMisRepairRequest,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getMisRepairRequestsQueryOptions().queryKey });
      onSuccess?.(...args);
    },
  });
};
