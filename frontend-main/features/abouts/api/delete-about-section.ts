import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAboutSectionsQueryOptions } from "./get-about-sections";

export const deleteAboutSection = ({ id }: { id: string }) => {
  return api.delete(`/about-sections/${id}`);
};

type UseDeleteAboutSectionOptions = {
  mutationConfig?: MutationConfig<typeof deleteAboutSection>;
};

export const useDeleteAboutSection = ({
  mutationConfig,
}: UseDeleteAboutSectionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAboutSectionsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteAboutSection,
  });
};
