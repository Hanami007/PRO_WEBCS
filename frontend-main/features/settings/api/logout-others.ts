import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

export const logoutOthers = (): Promise<{ message: string }> => {
  return api.post("/auth/logout-others");
};

type UseLogoutOthersOptions = {
  mutationConfig?: MutationConfig<typeof logoutOthers>;
};

export const useLogoutOthers = ({
  mutationConfig,
}: UseLogoutOthersOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: logoutOthers,
  });
};
