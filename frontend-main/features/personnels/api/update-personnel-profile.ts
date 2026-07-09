import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { PersonnelProfile } from "../types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getPersonnelQueryOptions } from "./get-personnel";

export const updatePersonnelProfileInputSchema = z.object({
  bio: z.string().optional(),
  workplace: z.string().optional(),
  skills: z.string().optional(),
  experts: z.string().optional(),
  experiences: z.string().optional(),
  researches: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export type UpdatePersonnelProfileInput = z.infer<typeof updatePersonnelProfileInputSchema>;

export const updatePersonnelProfile = ({
  data,
  id,
}: {
  data: UpdatePersonnelProfileInput;
  id: string;
}): Promise<PersonnelProfile> => {
  return api.patch(`/personnel-profiles/${id}`, data);
};

type UseUpdatePersonnelProfileOptions = {
  personnelId: string;
  mutationConfig?: MutationConfig<typeof updatePersonnelProfile>;
};

export const useUpdatePersonnelProfile = ({ personnelId, mutationConfig }: UseUpdatePersonnelProfileOptions) => {
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
    mutationFn: updatePersonnelProfile,
  });
};
