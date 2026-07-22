import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EquipmentBorrowStatus } from "../types/api";
import { getMisEquipmentBorrowsQueryOptions } from "./get-mis-equipment-borrows";

export type UpdateMisEquipmentBorrowInput = {
  status?: EquipmentBorrowStatus;
  note?: string;
};

export const updateMisEquipmentBorrow = ({
  id,
  data,
}: {
  id: string;
  data: UpdateMisEquipmentBorrowInput;
}): Promise<void> =>
  api.patch(`/mis-equipment-borrow/${id}`, data);

type UseOptions = {
  mutationConfig?: MutationConfig<typeof updateMisEquipmentBorrow>;
};

export const useUpdateMisEquipmentBorrow = ({
  mutationConfig,
}: UseOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: updateMisEquipmentBorrow,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getMisEquipmentBorrowsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
  });
};
