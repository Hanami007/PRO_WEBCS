import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Resource } from "../types/api";
import { getResourceQueryOptions } from "./get-resource";

export const updateResourceInputSchema = z.object({
  key: z.string().min(1, "Required"),
  value: z.string().min(1, "Required"),
  description: z.string().optional(),
});

export type UpdateResourceInput = z.infer<typeof updateResourceInputSchema>;

export const updateResource = ({
  data,
  resourceId,
}: {
  data: UpdateResourceInput;
  resourceId: string;
}): Promise<Resource> => {
  return api.patch(`/resources/${resourceId}`, data);
};

type UseUpdateResourceOptions = {
  mutationConfig?: MutationConfig<typeof updateResource>;
};

export const useUpdateResource = ({
  mutationConfig,
}: UseUpdateResourceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getResourceQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateResource,
  });
};
