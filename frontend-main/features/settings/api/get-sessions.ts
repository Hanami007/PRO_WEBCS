import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Session } from "@/types/api";

export const getSessions = (): Promise<Session[]> => {
  return api.get("/auth/sessions");
};

export const getSessionsQueryOptions = () => {
  return {
    queryKey: ["sessions"],
    queryFn: getSessions,
  };
};

type UseSessionsOptions = {
  queryConfig?: QueryConfig<typeof getSessions>;
};

export const useSessions = ({ queryConfig }: UseSessionsOptions = {}) => {
  return useQuery({
    ...getSessionsQueryOptions(),
    ...queryConfig,
  });
};
