import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Meta, PaginatedParams } from "@/types/api";
import { Contact } from "../types/api";
import { QueryConfig } from "@/lib/react-query";

export const getContacts = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: Contact[];
  meta: Meta;
}> => {
  return api.get(`/contacts`, { params });
};

export const getContactsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["contacts", params],
    queryFn: () => getContacts(params),
  });
};

type UseContactsOption = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getContactsQueryOptions>;
};

export const useContacts = ({
  queryConfig,
  ...params
}: UseContactsOption = {}) => {
  return useQuery({ ...getContactsQueryOptions(params), ...queryConfig });
};
