import { api } from "@/lib/api-client";
import { Alumni } from "../types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getAlumni = ({
  alumniId,
}: {
  alumniId: string;
}): Promise<Alumni> => {
  return api.get(`/alumnis/${alumniId}`);
};

export const getAlumniQueryOption = (alumniId: string) => {
  return queryOptions({
    queryKey: ["alumnis", alumniId],
    queryFn: () => getAlumni({ alumniId }),
  });
};

export const useAlumni = (alumniId: string) => {
  return useQuery(getAlumniQueryOption(alumniId));
};
