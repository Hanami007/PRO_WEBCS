import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getArticlesQueryOptions } from "./get-articles";
import { Article } from "../types/api";

export const createArticleInputSchema = z.object({
  title: z.string().min(1, "Required").max(255),
  description: z.string().optional(),
});

export type CreateArticleInput = z.infer<typeof createArticleInputSchema>;

export const createArticle = ({
  data,
}: {
  data: CreateArticleInput;
}): Promise<Article> => {
  return api.post(`/articles`, data);
};

type UseCreateArticleOptions = {
  mutationConfig?: MutationConfig<typeof createArticle>;
};

export const useCreateArticle = ({
  mutationConfig,
}: UseCreateArticleOptions = {}) => {
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
    mutationFn: createArticle,
  });
};
