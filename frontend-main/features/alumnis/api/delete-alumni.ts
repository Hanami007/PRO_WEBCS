import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAlumnisQueryOptions } from "./get-alumnis";

export const deleteAlumni = ({ id }: { id: string }) => {
  return api.delete(`/alumnis/${id}`);
};

type UseDeleteAlumniOptions = {
  mutationConfig?: MutationConfig<typeof deleteAlumni>;
};

export const useDeleteAlumni = ({
  mutationConfig,
}: UseDeleteAlumniOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAlumnisQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteAlumni,
  });
};
