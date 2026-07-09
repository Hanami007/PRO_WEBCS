"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import { ProjectDetail } from "@/features/projects/components/project-detail";
import { useProject } from "@/features/projects/api/get-project";
import { ErrorBoundary } from "react-error-boundary";
import { Spinner } from "@/components/ui/spinner";

export const Project = ({ projectId }: { projectId: string }) => {
  const projectQuery = useProject({ projectId });

  if (projectQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner className="size-18" />
      </div>
    );
  }

  const project = projectQuery.data;

  return (
    <ContentLayout
      title={project?.name || "Project Information"}
      description={project?.code ? `Academic Year ${project.year} • Code: ${project.code}` : undefined}
      align="center"
    >
      <ErrorBoundary
        fallback={
          <div className="text-center py-20 border rounded-2xl border-dashed text-muted-foreground bg-muted/10">
            <p className="text-sm font-medium">Failed to load project details. Please try refreshing the page.</p>
          </div>
        }
      >
        <ProjectDetail projectId={projectId} />
      </ErrorBoundary>
    </ContentLayout>
  );
};
