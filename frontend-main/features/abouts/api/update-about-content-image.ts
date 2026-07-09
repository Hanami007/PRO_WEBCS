import { uploadFile } from "@/features/files/api/upload-file";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AboutContent } from "../types/api";
import { getAboutContentQueryOptions } from "./get-about-content";

export const updateAboutContentImage = async ({
  aboutContentId,
  file,
}: {
  aboutContentId: string;
  file: File | null;
}): Promise<AboutContent> => {
  let imagePayload = null;
  if (file) {
    imagePayload = await uploadFile({ file, prefix: "about-contents" });
  }
  return api.patch(`/about-contents/${aboutContentId}`, {
    image: imagePayload ? { id: imagePayload.id } : null,
  });
};

type UseUpdateAboutContentImageOptions = {
  aboutSectionId: string;
  mutationConfig?: MutationConfig<typeof updateAboutContentImage>;
};

export const useUpdateAboutContentImage = ({
  mutationConfig,
}: UseUpdateAboutContentImageOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getAboutContentQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateAboutContentImage,
  });
};
