import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import ResearchOverview from "./_components/project-overview";
import { getProjectsQueryOptions } from "@/features/projects/api/get-projects";

export const metadata = {
  title: "Projects",
  description:
    "Explore our diverse range of computer science projects, from undergraduate research to faculty-led innovations.",
};

type ProjectsPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
};

const ProjectsPage = async ({ searchParams }: ProjectsPageProps) => {
  const { page, limit, search } = await searchParams;
  const queryClient = new QueryClient();

  const params = {
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 12,
    search: search || "",
  };

  await queryClient.prefetchQuery(getProjectsQueryOptions(params));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ResearchOverview />
    </HydrationBoundary>
  );
};

export default ProjectsPage;
