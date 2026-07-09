import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Alumni } from "../types/api";
import { getAlumnisQueryOptions } from "./get-alumnis";

export const createAlumniInputSchema = z.object({
  fullName: z.string().min(1, "Required"),
  cohort: z.string().min(1, "Required"),
  workplace: z.string().min(1, "Required"),
  position: z.string().min(1, "Required"),
  quote: z.string().optional(),
});

export type CreateAlumniInput = z.infer<typeof createAlumniInputSchema>;

export const createAlumni = ({
  data,
}: {
  data: CreateAlumniInput;
}): Promise<Alumni> => {
  return api.post(`/alumnis`, data);
};

type UseCreateAlumniOptions = {
  mutationConfig?: MutationConfig<typeof createAlumni>;
};

export const useCreateAlumni = ({
  mutationConfig,
}: UseCreateAlumniOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAlumnisQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createAlumni,
  });
};
