import z from "zod";
import { Alumni } from "../types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAlumniQueryOption } from "./get-alumni";
import { MutationConfig } from "@/lib/react-query";
import { FileEntity } from "@/types/api";
import { uploadFile } from "@/features/files/api/upload-file";
import { api } from "@/lib/api-client";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updateAlumniImageInputSchema = z.object({
  file: z.file().mime(ACCEPTED_IMAGE_TYPES).max(MAX_FILE_SIZE),
});

export type UpdateAlumniImageInput = z.infer<
  typeof updateAlumniImageInputSchema
>;

type UpdateAlumniImageParams = {
  alumniId: string;
  file: File | null;
};

export const useUpdateAlumniImage = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<
    (data: UpdateAlumniImageParams) => Promise<Alumni>
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getAlumniQueryOption(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },

    mutationFn: async ({
      alumniId,
      file,
    }: UpdateAlumniImageParams): Promise<Alumni> => {
      let imagePayload: FileEntity | null = null;

      if (file) {
        imagePayload = await uploadFile({ file, prefix: "alumnis" });
      }

      return api.patch(`/alumnis/${alumniId}`, {
        profileImage: imagePayload,
      });
    },
  });
};
