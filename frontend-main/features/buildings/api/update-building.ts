import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Building } from "@/features/buildings/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const updateBuildingInputSchema = z.object({
  name: z.string().min(1, "Required"),
});

export type UpdateBuildingInput = z.infer<typeof updateBuildingInputSchema> & { id: string };

export const updateBuilding = ({
  data,
  id,
}: {
  data: Omit<UpdateBuildingInput, "id">;
  id: string;
}): Promise<Building> => {
  return api.patch(`/buildings/${id}`, data);
};

type UseUpdateBuildingOptions = {
  mutationConfig?: MutationConfig<typeof updateBuilding>;
};

export const useUpdateBuilding = ({ mutationConfig }: UseUpdateBuildingOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["buildings"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateBuilding,
  });
};
