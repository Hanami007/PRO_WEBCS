"use client";

import DashboardContentHeader from "@/components/dashboard-content-header";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { Separator } from "@/components/ui/separator";
import CreateAnnouncement from "@/features/announcements/components/dashboard/create-announcement";
import DashobardAnnouncementList from "@/features/announcements/components/dashboard/dashboard-announcement-list";

const DashboardAnnouncements = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Announcements"
        description="A list of announcement banners"
      >
        <CreateAnnouncement />
      </DashboardContentHeader>
      <Separator />
      <DashobardAnnouncementList />
    </DashboardContentLayout>
  );
};

export default DashboardAnnouncements;
