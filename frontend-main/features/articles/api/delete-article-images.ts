import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getArticleQueryOption } from "./get-article";
import { ArticleImageEntity } from "../types/api";

// Needs refactor: No relation needed for article.
export const deleteArticleImages = async ({
  images,
}: {
  images: ArticleImageEntity[];
  articleId: string;
}) => {
  const deletePromises = images.map((image) =>
    api.delete(`/articles/images/${image.id}`),
  );

  return Promise.all(deletePromises);
};

type UseDeleteArticleImagesOptions = {
  mutationConfig?: MutationConfig<typeof deleteArticleImages>;
};

export const useDeleteArticleImages = ({
  mutationConfig,
}: UseDeleteArticleImagesOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getArticleQueryOption(variables.articleId).queryKey,
      });

      onSuccess?.(data, variables, ...args);
    },
    ...restConfig,
    mutationFn: deleteArticleImages,
  });
};
