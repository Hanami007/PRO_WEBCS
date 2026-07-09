import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Contact, CONTACT_TYPES } from "../types/api";
import { getContactsQueryOptions } from "./get-contacts";

export const createContactInputSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional().nullable(),
  type: z.enum(CONTACT_TYPES),
  value: z.string().min(1, "Value is required"),
  label: z.string().optional(),
  sortOrder: z.coerce.number<number>(),
  isActive: z.boolean(),
});

export type CreateContactInput = z.infer<typeof createContactInputSchema>;

export const createContact = ({
  data,
}: {
  data: CreateContactInput;
}): Promise<Contact> => {
  return api.post(`/contacts`, data);
};

type UseCreateContactOptions = {
  mutationConfig?: MutationConfig<typeof createContact>;
};

export const useCreateContact = ({
  mutationConfig,
}: UseCreateContactOptions = {}) => {
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
    mutationFn: createContact,
  });
};
