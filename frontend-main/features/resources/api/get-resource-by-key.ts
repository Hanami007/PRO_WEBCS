import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Resource } from "../types/api";

export const getResourceByKey = ({
  resourceKey,
}: {
  resourceKey: string;
}): Promise<Resource> => {
  return api.get(`/resources/key/${resourceKey}`);
};

export const getResourceByKeyQueryOptions = (resourceKey: string) => {
  return queryOptions({
    queryKey: ["resource", resourceKey],
    queryFn: () => getResourceByKey({ resourceKey }),
  });
};

type UseResourceOptions = {
  resourceKey: string;
  queryConfig?: QueryConfig<typeof getResourceByKeyQueryOptions>;
};

export const useResourceByKey = ({
  resourceKey,
  queryConfig,
}: UseResourceOptions) => {
  return useQuery({
    ...getResourceByKeyQueryOptions(resourceKey),
    ...queryConfig,
  });
};
