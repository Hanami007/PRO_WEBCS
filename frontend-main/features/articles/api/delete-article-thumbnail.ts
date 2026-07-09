import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getArticleQueryOption } from "./get-article";

export const deleteArticleThumbnail = ({
  articleId,
}: {
  articleId: string;
}) => {
  return api.delete(`/articles/${articleId}/thumbnail`);
};

type UseDeleteArticleThumbnailOptions = {
  mutationConfig?: MutationConfig<typeof deleteArticleThumbnail>;
};

export const useDeleteArticleThumbnail = ({
  mutationConfig,
}: UseDeleteArticleThumbnailOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, ...args) => {
      const { articleId } = variables;
      queryClient.invalidateQueries({
        queryKey: getArticleQueryOption(articleId).queryKey,
      });
      onSuccess?.(data, variables, ...args);
    },
    ...restConfig,
    mutationFn: deleteArticleThumbnail,
  });
};
