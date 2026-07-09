import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Personnel } from "@/features/personnels/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getPersonnelQueryOptions } from "./get-personnel";

export const updatePersonnelInputSchema = z.object({
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

export type UpdatePersonnelInput = z.infer<typeof updatePersonnelInputSchema> & { id: string };

export const updatePersonnel = ({
  data,
  id,
}: {
  data: Omit<UpdatePersonnelInput, "id">;
  id: string;
}): Promise<Personnel> => {
  return api.patch(`/personnels/${id}`, data);
};

type UseUpdatePersonnelOptions = {
  mutationConfig?: MutationConfig<typeof updatePersonnel>;
};

export const useUpdatePersonnel = ({ mutationConfig }: UseUpdatePersonnelOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getPersonnelQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updatePersonnel,
  });
};
