import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getArticlesQueryOptions } from "./get-articles";

export const deleteArticle = ({ articleId }: { articleId: string }) => {
  return api.delete(`/articles/${articleId}`);
};

type UseDeleteArticleOptions = {
  mutationConfig?: MutationConfig<typeof deleteArticle>;
};

export const useDeleteArticle = ({
  mutationConfig,
}: UseDeleteArticleOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getArticlesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteArticle,
  });
};
