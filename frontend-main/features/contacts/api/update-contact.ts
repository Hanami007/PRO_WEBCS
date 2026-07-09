import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Contact, CONTACT_TYPES } from "../types/api";
import { getContactQueryOptions } from "./get-contact";
import { getContactsQueryOptions } from "./get-contacts";

export const updateContactInputSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional().nullable(),
  type: z.enum(CONTACT_TYPES),
  value: z.string().min(1, "Value is required"),
  label: z.string().optional().nullable(),
  sortOrder: z.coerce.number<number>(),
  isActive: z.boolean(),
});

export type UpdateContactInput = z.infer<typeof updateContactInputSchema>;

export const updateContact = ({
  data,
  id,
}: {
  data: UpdateContactInput;
  id: string;
}): Promise<Contact> => {
  return api.patch(`/contacts/${id}`, data);
};

type UseUpdateContactOptions = {
  mutationConfig?: MutationConfig<typeof updateContact>;
};

export const useUpdateContact = ({
  mutationConfig,
}: UseUpdateContactOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getContactQueryOptions(data.id).queryKey,
      });
      queryClient.refetchQueries({
        queryKey: getContactsQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateContact,
  });
};
