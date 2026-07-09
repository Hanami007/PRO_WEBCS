import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getResourcesQueryOptions } from "./get-resources";

export const deleteResource = ({
  resourceId,
}: {
  resourceId: string;
}): Promise<void> => {
  return api.delete(`/resources/${resourceId}`);
};

type UseDeleteResourceOptions = {
  mutationConfig?: MutationConfig<typeof deleteResource>;
};

export const useDeleteResource = ({
  mutationConfig,
}: UseDeleteResourceOptions = {}) => {
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
    mutationFn: deleteResource,
  });
};
