import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Program } from "@/features/programs/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getProgramQueryOptions } from "./get-program";

export const updateProgramInputSchema = z.object({
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

export type UpdateProgramInput = z.infer<typeof updateProgramInputSchema>;

export const updateProgram = ({
  data,
  programId,
}: {
  data: UpdateProgramInput;
  programId: string;
}): Promise<Program> => {
  return api.patch(`/programs/${programId}`, data);
};

type UseUpdateProgramOptions = {
  mutationConfig?: MutationConfig<typeof updateProgram>;
};

export const useUpdateProgram = ({
  mutationConfig,
}: UseUpdateProgramOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getProgramQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateProgram,
  });
};
