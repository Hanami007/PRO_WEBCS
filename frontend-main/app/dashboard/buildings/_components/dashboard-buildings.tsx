"use client";

import React from "react";
import { DashboardBuildingList } from "@/features/buildings/components/dashboard/dashboard-building-list";
import { CreateBuilding } from "@/features/buildings/components/dashboard/create-building";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";

export const DashboardBuildings = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Buildings Management"
        description="Manage campus buildings and their status."
      >
        <CreateBuilding />
      </DashboardContentHeader>
      <Separator />
      <DashboardBuildingList />
    </DashboardContentLayout>
  );
};

export default DashboardBuildings;
