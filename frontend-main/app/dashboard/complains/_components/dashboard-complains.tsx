"use client";

import DashboardContentHeader from "@/components/dashboard-content-header";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { Separator } from "@/components/ui/separator";
import { DashboardComplainList } from "@/features/complains/components/dashboard/dashboard-complain-list";
import React from "react";

const DashboardComplains = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Complains Management"
        description="View and manage user feedback and complaints."
      />
      <Separator />
      <DashboardComplainList />
    </DashboardContentLayout>
  );
};

export default DashboardComplains;
