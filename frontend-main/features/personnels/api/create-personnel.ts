import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Personnel } from "@/features/personnels/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getPersonnelsQueryOptions } from "./get-personnels";

export const createPersonnelInputSchema = z.object({
  citizenId: z.string().optional().nullable(),
  prefix: z.string().optional().nullable(),
  fullnameTh: z.string().min(1, "Required"),
  fullnameEn: z.string().min(1, "Required"),
  academicPosition: z.string().optional().nullable(),
  administrativePosition: z.string().optional().nullable(),
  education: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().email("Invalid email").optional().nullable().or(z.literal("")),
  personnelType: z.string().min(1, "Required"),
  academicType: z.string().optional().nullable(),
  workStatusId: z.string().min(1, "Required"),
});

export type CreatePersonnelInput = z.infer<typeof createPersonnelInputSchema>;

export const createPersonnel = ({
  data,
}: {
  data: CreatePersonnelInput;
}): Promise<Personnel> => {
  return api.post("/personnels", data);
};

type UseCreatePersonnelOptions = {
  mutationConfig?: MutationConfig<typeof createPersonnel>;
};

export const useCreatePersonnel = ({ mutationConfig }: UseCreatePersonnelOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getPersonnelsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createPersonnel,
  });
};
