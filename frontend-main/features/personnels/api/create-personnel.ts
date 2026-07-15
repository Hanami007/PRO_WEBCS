import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Personnel } from "@/features/personnels/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getPersonnelsQueryOptions } from "./get-personnels";
import { FileEntity } from "@/types/api";
import {
  PRIVATE_ACCEPTED_FILE_TYPES,
  PRIVATE_MAX_FILE_SIZE,
  uploadFile,
} from "@/features/files/api/upload-file";

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
  file: z.file().mime(PRIVATE_ACCEPTED_FILE_TYPES).max(PRIVATE_MAX_FILE_SIZE).optional().nullable(),
});

export type CreatePersonnelInput = z.infer<typeof createPersonnelInputSchema>;

export const createPersonnel = ({
  data,
}: {
  data: Omit<CreatePersonnelInput, "file">;
}): Promise<Personnel> => {
  return api.post("/personnels", data);
};

type UseCreatePersonnelOptions = {
  mutationConfig?: MutationConfig<typeof createPersonnel>;
};

type CreatePersonnelArgs = {
  data: Omit<CreatePersonnelInput, "file">;
  file?: File | null;
};

export const useCreatePersonnel = ({ mutationConfig }: UseCreatePersonnelOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getPersonnelsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    mutationFn: async ({ data, file }: CreatePersonnelArgs): Promise<Personnel> => {
      const personnel = await createPersonnel({ data });

      if (file) {
        const imagePayload = await uploadFile({ file, prefix: "personnels" });
        return api.patch<Personnel>(`/personnels/${personnel.id}`, {
          profileImage: imagePayload,
        });
      }

      return personnel;
    },
  });
};
