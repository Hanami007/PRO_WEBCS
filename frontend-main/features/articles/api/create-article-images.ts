import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { FileEntity } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z.file().max(MAX_FILE_SIZE).mime(ACCEPTED_IMAGE_TYPES);

export const createArticleImagesInputSchema = z.object({
  files: z.array(fileSchema).min(1, "Please select at least 1 or more file."),
});

export type CreateArticleImagesInput = z.infer<
  typeof createArticleImagesInputSchema
>;

export const createArticleImage = ({
  file,
  articleId,
}: {
  file: File;
  articleId: string;
}): Promise<FileEntity> => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/articles/${articleId}/images`, formData);
};

export const uploadArticleImages = async ({
  data,
  articleId,
}: {
  data: CreateArticleImagesInput;
  articleId: string;
}): Promise<FileEntity[]> => {
  const uploadPromises = data.files.map((file) =>
    createArticleImage({ file, articleId }),
  );

  return Promise.all(uploadPromises);
};

type UseUploadArticleImagesOptions = {
  mutationConfig?: MutationConfig<typeof uploadArticleImages>;
};

export const useUploadArticleImages = ({
  mutationConfig,
}: UseUploadArticleImagesOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: uploadArticleImages,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
  });
};
