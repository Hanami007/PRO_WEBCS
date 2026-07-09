import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { AboutSection } from "../types/api";

export const getAboutSection = ({
  aboutSectionId,
}: {
  aboutSectionId: string;
}): Promise<AboutSection> => {
  return api.get(`/about-sections/${aboutSectionId}`);
};

export const getAboutSectionQueryOption = (aboutSectionId: string) => {
  return {
    queryKey: ["about-sections", aboutSectionId],
    queryFn: () => getAboutSection({ aboutSectionId }),
  };
};

export const useAboutSection = (aboutSectionId: string) => {
  return useQuery(getAboutSectionQueryOption(aboutSectionId));
};
