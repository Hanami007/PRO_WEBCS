import { api } from "@/lib/api-client";
import { z } from "zod";
import { AboutSection } from "../types/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const updateAboutSectionInputSchema = z.object({
  title: z.string().min(1, "Required"),
  sortOrder: z.any().optional(),
});

export type UpdateAboutSectionInput = z.infer<
  typeof updateAboutSectionInputSchema
>;

export const updateAboutSection = ({
  data,
  aboutSectionId,
}: {
  data: UpdateAboutSectionInput;
  aboutSectionId: string;
}): Promise<AboutSection> => {
  return api.patch(`/about-sections/${aboutSectionId}`, data);
};

type UseUpdateAboutSectionOptions = {
  mutationConfig?: MutationConfig<typeof updateAboutSection>;
};

export const useUpdateAboutSection = ({
  mutationConfig,
}: UseUpdateAboutSectionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: ["about-sections"],
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateAboutSection,
  });
};
