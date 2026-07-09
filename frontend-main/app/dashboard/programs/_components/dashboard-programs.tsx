"use client";

import DashboardContentHeader from "@/components/dashboard-content-header";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { Separator } from "@/components/ui/separator";
import { CreateProgram } from "@/features/programs/components/dashboard/create-program";
import DashboardProgramList from "@/features/programs/components/dashboard/dashboard-program-list";
import React from "react";

const DashboardPrograms = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Programs"
        description="Manage your department programs."
      >
        <CreateProgram />
      </DashboardContentHeader>
      <Separator />
      <DashboardProgramList />
    </DashboardContentLayout>
  );
};

export default DashboardPrograms;
