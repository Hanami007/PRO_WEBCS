"use client";

import React from "react";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { CreateEvent } from "@/features/events/components/dashboard/create-event";
import { DashboardEventsList } from "@/features/events/components/dashboard/dashboard-events-list";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";

export const DashboardEvents = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Events Management"
        description="List and manage all academic activities."
      >
        <CreateEvent />
      </DashboardContentHeader>
      <Separator />
      <DashboardEventsList />
    </DashboardContentLayout>
  );
};
