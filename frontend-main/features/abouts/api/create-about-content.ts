import z from "zod";
import { AboutContent } from "../types/api";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAboutSectionQueryOption } from "./get-about-section";

export const createAboutContentInputSchema = z.object({
  section: z.object({ id: z.string().min(1, "Required") }),
  layoutType: z.string().min(1, "Required"),
});

export type CreateAboutContentInput = z.infer<
  typeof createAboutContentInputSchema
>;

export const createAboutContent = ({
  data,
}: {
  data: CreateAboutContentInput;
}): Promise<AboutContent> => {
  return api.post(`/about-contents`, data);
};

type UseCreateAboutContentOptions = {
  aboutSectionId: string;
  mutationConfig?: MutationConfig<typeof createAboutContent>;
};

export const useCreateAboutContent = ({
  aboutSectionId,
  mutationConfig,
}: UseCreateAboutContentOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAboutSectionQueryOption(aboutSectionId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createAboutContent,
  });
};
