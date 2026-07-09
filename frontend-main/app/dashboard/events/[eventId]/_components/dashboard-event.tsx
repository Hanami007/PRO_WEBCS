"use client";

import React from "react";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { UpdateEvent } from "@/features/events/components/dashboard/update-event";

type DashboardEventProps = {
  eventId: string;
};

export const DashboardEvent = ({ eventId }: DashboardEventProps) => {
  return (
    <DashboardContentLayout>
      <UpdateEvent eventId={eventId} />
    </DashboardContentLayout>
  );
};
