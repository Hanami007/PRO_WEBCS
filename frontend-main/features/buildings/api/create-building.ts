import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Building } from "@/features/buildings/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  PRIVATE_ACCEPTED_FILE_TYPES,
  PRIVATE_MAX_FILE_SIZE,
  uploadFile,
} from "@/features/files/api/upload-file";

export const createBuildingInputSchema = z.object({
  name: z.string().min(1, "Required"),
  file: z.file().mime(PRIVATE_ACCEPTED_FILE_TYPES).max(PRIVATE_MAX_FILE_SIZE).optional().nullable(),
});

export type CreateBuildingInput = z.infer<typeof createBuildingInputSchema>;

export const createBuilding = ({ data }: { data: Omit<CreateBuildingInput, "file"> }): Promise<Building> => {
  return api.post(`/buildings`, data);
};

type UseCreateBuildingOptions = {
  mutationConfig?: MutationConfig<typeof createBuilding>;
};

type CreateBuildingArgs = {
  data: Omit<CreateBuildingInput, "file">;
  file?: File | null;
};

export const useCreateBuilding = ({ mutationConfig }: UseCreateBuildingOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["buildings"],
      });
      onSuccess?.(...args);
    },
    mutationFn: async ({ data, file }: CreateBuildingArgs): Promise<Building> => {
      const building = await createBuilding({ data });

      if (file) {
        const imagePayload = await uploadFile({ file, prefix: "buildings" });
        return api.patch<Building>(`/buildings/${building.id}`, {
          image: imagePayload,
        });
      }

      return building;
    },
  });
};
