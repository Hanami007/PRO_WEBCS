import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AboutSection } from "../types/api";
import { Meta, PaginatedParams } from "@/types/api";
import { QueryConfig } from "@/lib/react-query";

export const getAboutSections = (
  params: PaginatedParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
  },
): Promise<{
  data: AboutSection[];
  meta: Meta;
}> => {
  return api.get("/about-sections", {
    params,
  });
};

export const getAboutSectionsQueryOptions = (params: PaginatedParams = {}) => {
  return queryOptions({
    queryKey: ["about-sections", params],
    queryFn: () => getAboutSections(params),
  });
};

type UseAboutSectionsOptions = PaginatedParams & {
  queryConfig?: QueryConfig<typeof getAboutSectionsQueryOptions>;
};

export const useAboutSections = ({
  queryConfig,
  ...params
}: UseAboutSectionsOptions) => {
  return useQuery({
    ...getAboutSectionsQueryOptions(params),
    ...queryConfig,
  });
};
