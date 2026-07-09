import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Building } from "@/features/buildings/types/api";

export const getBuilding = ({ id }: { id: string }): Promise<Building> => {
  return api.get(`/buildings/${id}`);
};

export const getBuildingQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["buildings", id],
    queryFn: () => getBuilding({ id }),
  });
};

export const useBuilding = ({ id }: { id: string }) => {
  return useQuery(getBuildingQueryOptions(id));
};