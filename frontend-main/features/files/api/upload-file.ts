import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { FileEntity as FileEntity } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export const PRIVATE_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const PRIVATE_ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export const uploadFileInputSchema = z.object({
  file: z.file().mime(PRIVATE_ACCEPTED_FILE_TYPES).max(PRIVATE_MAX_FILE_SIZE),
});

export type UploadFileFormData = z.infer<typeof uploadFileInputSchema>;

export const uploadFile = async ({
  file,
  prefix = "no-modules",
}: {
  file: File;
  prefix?: string;
}): Promise<FileEntity> => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(`/files/upload/${prefix}`, formData);
};

type UseUploadFileOptions = {
  mutationConfig?: MutationConfig<typeof uploadFile>;
};

export const useUploadFile = ({
  mutationConfig,
}: UseUploadFileOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    ...restConfig,
  });
};
