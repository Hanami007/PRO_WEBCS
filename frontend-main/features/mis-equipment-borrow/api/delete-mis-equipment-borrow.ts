import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMisEquipmentBorrowsQueryOptions } from "./get-mis-equipment-borrows";

export const deleteMisEquipmentBorrow = ({ id }: { id: string }): Promise<void> =>
  api.delete(`/mis-equipment-borrow/${id}`);

type UseOptions = { mutationConfig?: MutationConfig<typeof deleteMisEquipmentBorrow> };

export const useDeleteMisEquipmentBorrow = ({ mutationConfig }: UseOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: deleteMisEquipmentBorrow,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getMisEquipmentBorrowsQueryOptions().queryKey });
      onSuccess?.(...args);
    },
  });
};
