import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { PersonnelProfile } from "../types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getPersonnelQueryOptions } from "./get-personnel";

export const createPersonnelProfileInputSchema = z.object({
  personnelId: z.string().min(1, "Required"),
});

export type CreatePersonnelProfileInput = z.infer<typeof createPersonnelProfileInputSchema>;

export const createPersonnelProfile = ({
  data,
}: {
  data: CreatePersonnelProfileInput;
}): Promise<PersonnelProfile> => {
  return api.post(`/personnel-profiles`, data);
};

type UseCreatePersonnelProfileOptions = {
  personnelId: string;
  mutationConfig?: MutationConfig<typeof createPersonnelProfile>;
};

export const useCreatePersonnelProfile = ({ personnelId, mutationConfig }: UseCreatePersonnelProfileOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getPersonnelQueryOptions(personnelId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createPersonnelProfile,
  });
};
