import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { FileEntity } from "@/types/api";
import { uploadFile } from "@/features/files/api/upload-file";
import { api } from "@/lib/api-client";
import { Project } from "../types/api";
import { getProjectQueryOptions } from "./get-project";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const updateProjectFileInputSchema = z.object({
  file: z.file().mime(ACCEPTED_FILE_TYPES).max(MAX_FILE_SIZE),
});

export type UpdateProjectFileInput = z.infer<
  typeof updateProjectFileInputSchema
>;

type UpdateProjectFileParams = {
  projectId: string;
  file: File | null;
};

export const useUpdateProjectFile = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<
    (data: UpdateProjectFileParams) => Promise<Project>
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getProjectQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },

    mutationFn: async ({
      projectId,
      file,
    }: UpdateProjectFileParams): Promise<Project> => {
      let filePayload: FileEntity | null = null;

      if (file) {
        filePayload = await uploadFile({ file, prefix: "projects" });
      }

      return api.patch(`/projects/${projectId}`, {
        file: filePayload,
      });
    },
  });
};
