"use client";

import React from "react";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import DashboardAboutSectionList from "@/features/abouts/components/dashboard/dashboard-about-section-list";
import { CreateAboutSection } from "@/features/abouts/components/dashboard/create-about-section";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";

const DashboardAbout = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="About Us Management"
        description="Manage website sections and content blocks."
      >
        <CreateAboutSection />
      </DashboardContentHeader>
      <Separator />
      <DashboardAboutSectionList />
    </DashboardContentLayout>
  );
};

export default DashboardAbout;
