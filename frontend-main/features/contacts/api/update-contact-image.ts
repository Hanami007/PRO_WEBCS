import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { FileEntity } from "@/types/api";
import { uploadFile } from "@/features/files/api/upload-file";
import { api } from "@/lib/api-client";
import { Contact } from "../types/api";
import { getContactQueryOptions } from "./get-contact";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updateContactImageInputSchema = z.object({
  file: z.file().mime(ACCEPTED_IMAGE_TYPES).max(MAX_FILE_SIZE),
});

export type UpdateContactImageInput = z.infer<
  typeof updateContactImageInputSchema
>;

type UpdateContactImageParams = {
  contactId: string;
  file: File | null;
};

export const useUpdateContactImage = ({
  mutationConfig,
}: {
  mutationConfig?: MutationConfig<
    (data: UpdateContactImageParams) => Promise<Contact>
  >;
} = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getContactQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },

    mutationFn: async ({
      contactId,
      file,
    }: UpdateContactImageParams): Promise<Contact> => {
      let imagePayload: FileEntity | null = null;

      if (file) {
        imagePayload = await uploadFile({ file, prefix: "contacts" });
      }

      return api.patch(`/contacts/${contactId}`, {
        image: imagePayload,
      });
    },
  });
};
