import { api } from "@/lib/api-client";
import { z } from "zod";
import { AboutContent, aboutContentLayoutEnum } from "../types/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAboutContentQueryOptions } from "./get-about-content";

export const updateAboutContentInputSchema = z.object({
  layoutType: z.enum(aboutContentLayoutEnum),
  title: z.string().optional(),
  body: z.string().optional(),
  sortOrder: z.number(),
});

export type UpdateAboutContentInput = z.infer<
  typeof updateAboutContentInputSchema
>;

export const updateAboutContent = ({
  data,
  aboutContentId,
}: {
  data: UpdateAboutContentInput;
  aboutContentId: string;
}): Promise<AboutContent> => {
  return api.patch(`/about-contents/${aboutContentId}`, data);
};

type UseUpdateAboutContentOptions = {
  mutationConfig?: MutationConfig<typeof updateAboutContent>;
};

export const useUpdateAboutContent = ({
  mutationConfig,
}: UseUpdateAboutContentOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getAboutContentQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateAboutContent,
  });
};
