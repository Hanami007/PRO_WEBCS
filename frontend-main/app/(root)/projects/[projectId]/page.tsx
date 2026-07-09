import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Project } from "./_components/project";
import { getProject, getProjectQueryOptions } from "@/features/projects/api/get-project";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { projectId } = await params;
  try {
    const project = await getProject({ projectId });
    return {
      title: `${project.name} | Project`,
      description: project.detail?.substring(0, 160) || "Project details and information.",
    };
  } catch {
    return {
      title: "Project Detail",
    };
  }
}

const ProjectDetailPage = async ({ params }: PageProps) => {
  const { projectId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getProjectQueryOptions(projectId));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Project projectId={projectId} />
    </HydrationBoundary>
  );
};

export default ProjectDetailPage;
