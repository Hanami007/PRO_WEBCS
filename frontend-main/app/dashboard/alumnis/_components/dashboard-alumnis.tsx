"use client";

import React from "react";
import { DashboardAlumniList } from "@/features/alumnis/components/dashboard/dashboard-alumni-list";
import { CreateAlumni } from "@/features/alumnis/components/dashboard/create-alumni";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";

const DashboardAlumnis = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Alumni Management"
        description="Manage alumni information."
      >
        <CreateAlumni />
      </DashboardContentHeader>
      <Separator />
      <DashboardAlumniList />
    </DashboardContentLayout>
  );
};

export default DashboardAlumnis;
