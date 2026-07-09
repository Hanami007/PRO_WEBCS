import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Program } from "@/features/programs/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getProgramsQueryOptions } from "./get-programs";

export const createProgramInputSchema = z.object({
  code: z.string().min(1, "Required"),
  nameTh: z.string().min(1, "Required"),
  nameEn: z.string().min(1, "Required"),
  degreeThFull: z.string().optional(),
  degreeEnFull: z.string().optional(),
  degreeTh: z.string().optional(),
  degreeEn: z.string().optional(),
  credits: z.number().optional(),
  revision: z.string().optional(),
  duration: z.string().optional(),
  languages: z.string().optional(),
  tqf: z.string().optional(),
  isCurrent: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export type CreateProgramInput = z.infer<typeof createProgramInputSchema>;

export const createProgram = ({
  data,
}: {
  data: CreateProgramInput;
}): Promise<Program> => {
  return api.post(`/programs`, data);
};

type UseCreateProgramOptions = {
  mutationConfig?: MutationConfig<typeof createProgram>;
};

export const useCreateProgram = ({
  mutationConfig,
}: UseCreateProgramOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProgramsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createProgram,
  });
};
