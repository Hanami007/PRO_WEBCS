import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Project } from "../types/api";
import { getProjectsQueryOptions } from "./get-projects";

export const createProjectInputSchema = z.object({
  code: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
  year: z.string().min(4, "Required at least 4: Eg. 2569"),
  detail: z.string().optional(),
  editors: z
    .array(z.object({ value: z.string().min(1, "Required") }))
    .min(1, "At least one author is required"),
  chairmanId: z.string().min(1, "Chairman is required"),
  director1Id: z.string().optional().nullable(),
  director2Id: z.string().optional().nullable(),
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

export const createProject = ({
  data,
}: {
  data: CreateProjectInput;
}): Promise<Project> => {
  return api.post(`/projects`, data);
};

type UseCreateProjectOptions = {
  mutationConfig?: MutationConfig<typeof createProject>;
};

export const useCreateProject = ({
  mutationConfig,
}: UseCreateProjectOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProjectsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createProject,
  });
};
