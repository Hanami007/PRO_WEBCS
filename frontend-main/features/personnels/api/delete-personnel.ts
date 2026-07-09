import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deletePersonnel = ({
  personnelId,
}: {
  personnelId: string;
}): Promise<void> => {
  return api.delete(`/personnels/${personnelId}`);
};

type UseDeletePersonnelOptions = {
  mutationConfig?: MutationConfig<typeof deletePersonnel>;
};

export const useDeletePersonnel = ({ mutationConfig }: UseDeletePersonnelOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["personnels"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deletePersonnel,
  });
};
