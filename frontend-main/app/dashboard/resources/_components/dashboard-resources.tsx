"use client";

import DashboardContentHeader from "@/components/dashboard-content-header";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { Separator } from "@/components/ui/separator";
import { CreateResource } from "@/features/resources/components/dashboard/create-resource";
import DashboardResourcesList from "@/features/resources/components/dashboard/dashboard-resources-list";
import React from "react";

export const DashboardResources = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Resources Management"
        description="Manage system links and configuration values."
      >
        <CreateResource />
      </DashboardContentHeader>
      <Separator />
      <DashboardResourcesList />
    </DashboardContentLayout>
  );
};

export default DashboardResources;
