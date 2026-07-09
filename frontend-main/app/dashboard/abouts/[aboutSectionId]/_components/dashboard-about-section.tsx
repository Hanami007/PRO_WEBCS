"use client";

import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import UpdateAboutSection from "@/features/abouts/components/dashboard/update-about-section";
import React from "react";

type DashboardAboutSectionProps = {
  aboutSectionId: string;
};

const DashboardAboutSection = ({
  aboutSectionId,
}: DashboardAboutSectionProps) => {
  return (
    <DashboardContentLayout>
      <UpdateAboutSection aboutSectionId={aboutSectionId} />
    </DashboardContentLayout>
  );
};

export default DashboardAboutSection;
