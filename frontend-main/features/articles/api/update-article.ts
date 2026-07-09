import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getArticleQueryOption } from "./get-article";
import { Article } from "../types/api";

export const updateArticleInputSchema = z.object({
  title: z.string().min(1, "Required").max(255),
  content: z.string().optional().nullable(),
  published: z.boolean().optional(),
  link: z.string().optional(),
  category: z.string().optional(),
});

export type UpdateArticleInput = z.infer<typeof updateArticleInputSchema>;

export const updateArticle = ({
  data,
  articleId,
}: {
  data: UpdateArticleInput;
  articleId: string;
}): Promise<Article> => {
  return api.patch(`/articles/${articleId}`, data);
};

type UseUpdateArticleOptions = {
  mutationConfig?: MutationConfig<typeof updateArticle>;
};

export const useUpdateArticle = ({
  mutationConfig,
}: UseUpdateArticleOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getArticleQueryOption(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateArticle,
  });
};
