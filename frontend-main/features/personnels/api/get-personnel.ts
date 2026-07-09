import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Personnel } from "@/features/personnels/types/api";
import { QueryConfig } from "@/lib/react-query";

export const getPersonnel = ({
  personnelId,
}: {
  personnelId: string;
}): Promise<Personnel> => {
  return api.get(`/personnels/${personnelId}`);
};

export const getPersonnelQueryOptions = (personnelId: string) => {
  return queryOptions({
    queryKey: ["personnels", personnelId],
    queryFn: () => getPersonnel({ personnelId }),
  });
};

type UsePersonnelOptions = {
  personnelId: string;
  queryConfig?: QueryConfig<typeof getPersonnelQueryOptions>;
};

export const usePersonnel = ({
  personnelId,
  queryConfig,
}: UsePersonnelOptions) => {
  return useQuery({
    ...getPersonnelQueryOptions(personnelId),
    ...queryConfig,
  });
};
