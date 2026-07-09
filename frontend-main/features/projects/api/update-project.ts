import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Project } from "../types/api";
import { getProjectQueryOptions } from "./get-project";

export const updateProjectInputSchema = z.object({
  code: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
  year: z.string().min(4, "Required at least 4 characters. Eg. 2569"),
  detail: z.string().optional(),
  editors: z
    .array(z.object({ value: z.string().min(1, "Required") }))
    .min(1, "At least one author is required"),
  chairmanId: z.string().min(1, "Chairman is required"),
  director1Id: z.string().optional().nullable(),
  director2Id: z.string().optional().nullable(),
});

export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema>;

export const updateProject = ({
  data,
  projectId,
}: {
  data: UpdateProjectInput;
  projectId: string;
}): Promise<Project> => {
  return api.patch(`/projects/${projectId}`, data);
};

type UseUpdateProjectOptions = {
  mutationConfig?: MutationConfig<typeof updateProject>;
};

export const useUpdateProject = ({
  mutationConfig,
}: UseUpdateProjectOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getProjectQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateProject,
  });
};
