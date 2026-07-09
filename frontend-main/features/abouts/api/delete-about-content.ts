import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAboutContentsQueryOptions } from "./get-about-contents";

export const deleteAboutContent = ({
  aboutContentId,
}: {
  aboutContentId: string;
}) => {
  return api.delete(`/about-contents/${aboutContentId}`);
};

type UseDeleteAboutContentOptions = {
  mutationConfig?: MutationConfig<typeof deleteAboutContent>;
};

export const useDeleteAboutContent = ({
  mutationConfig,
}: UseDeleteAboutContentOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAboutContentsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteAboutContent,
  });
};
