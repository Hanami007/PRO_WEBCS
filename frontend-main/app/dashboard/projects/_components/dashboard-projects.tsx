"use client";

import React from "react";
import { DashboardProjectList } from "@/features/projects/components/dashboard/dashboard-project-list";
import { CreateProject } from "@/features/projects/components/dashboard/create-project";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";

export const DashboardProjects = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Projects Management"
        description="Manage student research projects and faculty publications."
      >
        <CreateProject />
      </DashboardContentHeader>
      <Separator />
      <DashboardProjectList />
    </DashboardContentLayout>
  );
};

export default DashboardProjects;
