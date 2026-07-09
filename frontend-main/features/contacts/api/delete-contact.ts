import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getContactsQueryOptions } from "./get-contacts";

export const deleteContact = ({ id }: { id: string }) => {
  return api.delete(`/contacts/${id}`);
};

type UseDeleteContactOptions = {
  mutationConfig?: MutationConfig<typeof deleteContact>;
};

export const useDeleteContact = ({
  mutationConfig,
}: UseDeleteContactOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getContactsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteContact,
  });
};
