import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteBuilding = ({ id }: { id: string }) => {
  return api.delete(`/buildings/${id}`);
};

type UseDeleteBuildingOptions = {
  mutationConfig?: MutationConfig<typeof deleteBuilding>;
};

export const useDeleteBuilding = ({ mutationConfig }: UseDeleteBuildingOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["buildings"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteBuilding,
  });
};
