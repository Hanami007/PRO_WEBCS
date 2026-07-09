import { api } from "@/lib/api-client";
import { Program } from "@/features/programs/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

export const getProgram = ({
  programId,
}: {
  programId: string;
}): Promise<Program> => {
  return api.get(`/programs/${programId}`);
};
export const getProgramQueryOptions = (programId: string) => {
  return queryOptions({
    queryKey: ["programs", programId],
    queryFn: () => getProgram({ programId }),
  });
};

type UseProgramOptions = {
  programId: string;
  queryConfig?: QueryConfig<typeof getProgramQueryOptions>;
};

export const useProgram = ({ programId, queryConfig }: UseProgramOptions) => {
  return useQuery({ ...getProgramQueryOptions(programId), ...queryConfig });
};
