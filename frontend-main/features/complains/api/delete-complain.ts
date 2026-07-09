import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getComplainsQueryOptions } from "./get-complains";

export const deleteComplain = ({ id }: { id: string }): Promise<void> => {
  return api.delete(`/complains/${id}`);
};

type UseDeleteComplainOptions = {
  mutationConfig?: MutationConfig<typeof deleteComplain>;
};

export const useDeleteComplain = ({
  mutationConfig,
}: UseDeleteComplainOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getComplainsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteComplain,
  });
};
