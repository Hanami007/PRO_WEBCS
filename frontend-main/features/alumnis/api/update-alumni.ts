import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Alumni } from "../types/api";
import { getAlumniQueryOption } from "./get-alumni";

export const updateAlumniInputSchema = z.object({
  fullName: z.string().min(1, "Required"),
  cohort: z.string().min(1, "Required"),
  workplace: z.string().min(1, "Required"),
  position: z.string().min(1, "Required"),
  quote: z.string().optional(),
});

export type UpdateAlumniInput = z.infer<typeof updateAlumniInputSchema>;

export const updateAlumni = ({
  data,
  id,
}: {
  data: UpdateAlumniInput;
  id: string;
}): Promise<Alumni> => {
  return api.patch(`/alumnis/${id}`, data);
};

type UseUpdateAlumniOptions = {
  mutationConfig?: MutationConfig<typeof updateAlumni>;
};

export const useUpdateAlumni = ({
  mutationConfig,
}: UseUpdateAlumniOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getAlumniQueryOption(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateAlumni,
  });
};
