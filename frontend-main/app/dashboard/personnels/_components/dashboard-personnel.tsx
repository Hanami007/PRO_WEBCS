"use client";

import React from "react";
import { DashboardPersonnelList } from "@/features/personnels/components/dashboard/dashboard-personnel-list";
import { CreatePersonnel } from "@/features/personnels/components/dashboard/create-personnel";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";

const DashboardPersonnel = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Personnel Management"
        description="Manage lecturers and staff information."
      >
        <CreatePersonnel />
      </DashboardContentHeader>
      <Separator />
      <DashboardPersonnelList />
    </DashboardContentLayout>
  );
};

export default DashboardPersonnel;
