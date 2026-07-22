import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Project } from "../types/api";
import { getProjectsQueryOptions } from "./get-projects";
import { uploadFile } from "@/features/files/api/upload-file";
import { FileEntity } from "@/types/api";

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
  file: z.any().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

export type CreateProjectParams = {
  data: CreateProjectInput;
  file?: File | null;
};

const isValidUuid = (val?: string | null) =>
  typeof val === "string" &&
  val.trim().length > 0 &&
  val !== "null" &&
  val !== "undefined";

export const createProject = async ({
  data,
  file,
}: CreateProjectParams): Promise<Project> => {
  const { chairmanId, director1Id, director2Id, editors, file: formFile, ...rest } = data;

  const targetFile = file || (formFile instanceof File ? formFile : null);
  let filePayload: FileEntity | null = null;

  if (targetFile) {
    filePayload = await uploadFile({ file: targetFile, prefix: "projects" });
  }

  const payload: Record<string, unknown> = {
    code: String(rest.code).trim(),
    name: String(rest.name).trim(),
    year: String(rest.year).trim(),
    detail: rest.detail ? String(rest.detail) : "",
    editors: editors.map((e) => e.value).filter((v) => v.trim() !== ""),
    chairman: { id: chairmanId },
  };

  if (isValidUuid(director1Id)) {
    payload.director1 = { id: director1Id };
  }

  if (isValidUuid(director2Id)) {
    payload.director2 = { id: director2Id };
  }

  if (filePayload?.id) {
    payload.file = { id: filePayload.id };
  }

  console.log("[DEBUG] createProject payload:", JSON.stringify(payload, null, 2));
  return api.post(`/projects`, payload);
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
