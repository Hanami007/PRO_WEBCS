import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Resource } from "../types/api";
import { getResourcesQueryOptions } from "./get-resources";

export const createResourceInputSchema = z.object({
  key: z.string().min(1, "Required"),
  value: z.string().min(1, "Required"),
  description: z.string().optional(),
});

export type CreateResourceInput = z.infer<typeof createResourceInputSchema>;

export const createResource = ({
  data,
}: {
  data: CreateResourceInput;
}): Promise<Resource> => {
  return api.post(`/resources`, data);
};

type UseCreateResourceOptions = {
  mutationConfig?: MutationConfig<typeof createResource>;
};

export const useCreateResource = ({
  mutationConfig,
}: UseCreateResourceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getResourcesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createResource,
  });
};
