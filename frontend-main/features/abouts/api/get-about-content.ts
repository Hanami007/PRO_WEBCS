import { api } from "@/lib/api-client";
import { AboutContent } from "../types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

export const getAboutContent = ({
  contentId,
}: {
  contentId: string;
}): Promise<AboutContent> => {
  return api.get(`/about-contents/${contentId}`);
};

export const getAboutContentQueryOptions = (contentId: string) => {
  return queryOptions({
    queryKey: ["about-contents", contentId],
    queryFn: () => getAboutContent({ contentId }),
  });
};

type UseAboutContentOptions = {
  contentId: string;
  queryConfig?: QueryConfig<typeof getAboutContentQueryOptions>;
};

export const useAboutContent = ({
  contentId,
  queryConfig,
}: UseAboutContentOptions) => {
  return useQuery({
    ...getAboutContentQueryOptions(contentId),
    ...queryConfig,
  });
};
