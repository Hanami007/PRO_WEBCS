import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { WorkStatus } from "../types/api";

export const getPersonnelStatuses = (): Promise<WorkStatus[]> => {
  return api.get("/personnel-status");
};

export const usePersonnelStatuses = () => {
  return useQuery({
    queryKey: ["personnel-statuses"],
    queryFn: getPersonnelStatuses,
  });
};
