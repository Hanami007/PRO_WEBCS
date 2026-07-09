import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getProgramsQueryOptions } from "./get-programs";

export const deleteProgram = ({ programId }: { programId: string }) => {
  return api.delete(`/programs/${programId}`);
};

type UseDeleteProgramOptions = {
  mutationConfig?: MutationConfig<typeof deleteProgram>;
};

export const useDeleteProgram = ({
  mutationConfig,
}: UseDeleteProgramOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProgramsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteProgram,
  });
};
