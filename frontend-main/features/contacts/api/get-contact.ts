import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Contact } from "../types/api";

export const getContact = ({
  contactId,
}: {
  contactId: string;
}): Promise<Contact> => {
  return api.get(`/contacts/${contactId}`);
};

export const getContactQueryOptions = (contactId: string) => {
  return queryOptions({
    queryKey: ["contacts", contactId],
    queryFn: () => getContact({ contactId }),
  });
};

export const useContact = ({ id }: { id: string }) => {
  return useQuery(getContactQueryOptions(id));
};
