import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Resource } from "../types/api";

export const getResource = ({
  resourceId,
}: {
  resourceId: string;
}): Promise<Resource> => {
  return api.get(`/resources/${resourceId}`);
};

export const getResourceQueryOptions = (resourceId: string) => {
  return queryOptions({
    queryKey: ["resource", resourceId],
    queryFn: () => getResource({ resourceId }),
  });
};

type UseResourceOptions = {
  resourceId: string;
  queryConfig?: QueryConfig<typeof getResourceQueryOptions>;
};

export const useResource = ({
  resourceId,
  queryConfig,
}: UseResourceOptions) => {
  return useQuery({
    ...getResourceQueryOptions(resourceId),
    ...queryConfig,
  });
};
