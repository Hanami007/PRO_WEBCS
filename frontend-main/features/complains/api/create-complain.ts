import { api } from "@/lib/api-client";
import z from "zod";
import { Complain } from "../types/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { FileEntity } from "@/types/api";
import {
  PUBLIC_ACCEPTED_FILE_TYPES,
  PUBLIC_MAX_FILE_SIZE,
  uploadFilePublic,
} from "@/features/files/api/upload-file-public";

export const createComplainInputSchema = z.object({
  title: z.string().min(5, "Required at least 5 characters"),
  detail: z.string().min(10, "Tell us a bit more about what happened"),
  image: z.custom<FileEntity>().optional(),
  file: z
    .file()
    .mime(PUBLIC_ACCEPTED_FILE_TYPES, "Not suppored file type.")
    .max(PUBLIC_MAX_FILE_SIZE, "File size must be under 3MB")
    .optional(),
});

export type CreateComplainInput = z.infer<typeof createComplainInputSchema>;

export type CreateComplainApiData = Omit<CreateComplainInput, "file">;

export const createComplain = ({
  data,
}: {
  data: CreateComplainApiData;
}): Promise<Complain> => {
  return api.post(`/complains`, data);
};

type UseCreateComplainOptions = {
  mutationConfig?: MutationConfig<typeof createComplain>;
};

type CreateComplainArgs = {
  data: CreateComplainApiData;
  file?: File | null;
};

export const useCreateComplain = ({
  mutationConfig,
}: UseCreateComplainOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    mutationFn: async ({ data, file }: CreateComplainArgs) => {
      let uploadedImage: FileEntity | undefined = undefined;

      if (file) {
        uploadedImage = await uploadFilePublic({ file, prefix: "complains" });
      }

      const payload = uploadedImage ? { ...data, image: uploadedImage } : data;

      return createComplain({ data: payload });
    },
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
  });
};
