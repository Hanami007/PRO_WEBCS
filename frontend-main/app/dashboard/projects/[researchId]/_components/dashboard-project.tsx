"use client";

import React from "react";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { UpdateProject } from "@/features/projects/components/dashboard/update-project";

export const DashboardProject = ({ projectId }: { projectId: string }) => {
  return (
    <DashboardContentLayout>
      <UpdateProject projectId={projectId} />
    </DashboardContentLayout>
  );
};
