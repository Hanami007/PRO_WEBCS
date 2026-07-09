import { DashboardProject } from "./_components/dashboard-project";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProjectQueryOptions } from "@/features/projects/api/get-project";
import React from "react";

type PageProps = {
  params: Promise<{
    researchId: string;
  }>;
};

const EditProjectPage = async (props: PageProps) => {
  const params = await props.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getProjectQueryOptions(params.researchId));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardProject projectId={params.researchId} />
    </HydrationBoundary>
  );
};

export default EditProjectPage;