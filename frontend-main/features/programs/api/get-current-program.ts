import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Program } from "@/features/programs/types/api";

export const getCurrentProgram = (): Promise<Program> => {
  return api.get("/programs/current");
};

export const getCurrentProgramQueryOptions = () => {
  return queryOptions({
    queryKey: ["currentProgram"],
    queryFn: () => getCurrentProgram(),
  });
};

export const useCurrentProgram = () => {
  return useQuery(getCurrentProgramQueryOptions());
};
