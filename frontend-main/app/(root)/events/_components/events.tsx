"use client";

import React from "react";
import { ContentLayout } from "@/components/layouts/content-layout";
import { EventsList } from "@/features/events/components/events-list";

export const Events = () => {
  return (
    <ContentLayout
      title="Events"
      description="Stay updated with our latest academic activities and department events."
    >
      <div className="space-y-8">
        <EventsList />
      </div>
    </ContentLayout>
  );
};
