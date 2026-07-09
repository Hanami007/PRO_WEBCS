import { uploadFile } from "@/features/files/api/upload-file";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { FileEntity } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getArticleQueryOption } from "./get-article";
import { Article } from "../types/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updateArticleThumbnailInputSchema = z.object({
  file: z.file().mime(ACCEPTED_IMAGE_TYPES).max(MAX_FILE_SIZE),
});

export type UpdateArticleThumbnailInput = z.infer<
  typeof updateArticleThumbnailInputSchema
>;

type UpdateThumbnailParams = {
  articleId: string;
  file: File | null;
};

export const useUpdateArticleThumbnail = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<
    (data: UpdateThumbnailParams) => Promise<Article>
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getArticleQueryOption(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },

    mutationFn: async ({
      articleId,
      file,
    }: UpdateThumbnailParams): Promise<Article> => {
      let thumbnailPayload: FileEntity | null = null;

      if (file) {
        thumbnailPayload = await uploadFile({ file, prefix: "articles" });
      }

      return api.patch(`/articles/${articleId}`, {
        thumbnail: thumbnailPayload,
      });
    },
  });
};
