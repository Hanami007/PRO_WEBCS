import z from "zod";
import { AboutSection } from "../types/api";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAboutSectionsQueryOptions } from "./get-about-sections";

export const createAboutSectionInputSchema = z.object({
  title: z.string().min(1, "Required"),
});

export type CreateAboutSectionInput = z.infer<
  typeof createAboutSectionInputSchema
>;

export const createAboutSection = ({
  data,
}: {
  data: CreateAboutSectionInput;
}): Promise<AboutSection> => {
  return api.post(`/about-sections`, data);
};

type UseCreateAboutSectionOptions = {
  mutationConfig?: MutationConfig<typeof createAboutSection>;
};

export const useCreateAboutSection = ({
  mutationConfig,
}: UseCreateAboutSectionOptions = {}) => {
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
    mutationFn: createAboutSection,
  });
};
