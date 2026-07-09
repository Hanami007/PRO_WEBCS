import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Building } from "@/features/buildings/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const createBuildingInputSchema = z.object({
  name: z.string().min(1, "Required"),
});

export type CreateBuildingInput = z.infer<typeof createBuildingInputSchema>;

export const createBuilding = ({ data }: { data: CreateBuildingInput }): Promise<Building> => {
  return api.post(`/buildings`, data);
};

type UseCreateBuildingOptions = {
  mutationConfig?: MutationConfig<typeof createBuilding>;
};

export const useCreateBuilding = ({ mutationConfig }: UseCreateBuildingOptions = {}) => {
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
    mutationFn: createBuilding,
  });
};
