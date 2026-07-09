import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { FileEntity as FileEntity } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export const PUBLIC_MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
export const PUBLIC_ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const uploadFilePublicInputSchema = z.object({
  file: z.file().mime(PUBLIC_ACCEPTED_FILE_TYPES).max(PUBLIC_MAX_FILE_SIZE),
});

export type UploadFileFormData = z.infer<typeof uploadFilePublicInputSchema>;

export const uploadFilePublic = async ({
  file,
  prefix = "no-modules",
}: {
  file: File;
  prefix?: string;
}): Promise<FileEntity> => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(`/files/upload/public/${prefix}`, formData);
};

type UseUploadFilePublicOptions = {
  mutationConfig?: MutationConfig<typeof uploadFilePublic>;
};

export const useUploadFilePublic = ({
  mutationConfig,
}: UseUploadFilePublicOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: uploadFilePublic,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    ...restConfig,
  });
};
