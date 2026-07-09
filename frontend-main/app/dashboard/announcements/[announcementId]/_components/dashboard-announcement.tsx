"use client";

import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { UpdateAnnouncement } from "@/features/announcements/components/dashboard/update-announcement";
import { ErrorBoundary } from "react-error-boundary";

export const DashboardAnnouncement = ({
  announcementId,
}: {
  announcementId: string;
}) => {
  return (
    <DashboardContentLayout>
      <ErrorBoundary
        fallback={
          <div>
            Failed to load announcement. Please try refreshing this page.
          </div>
        }
      >
        <UpdateAnnouncement announcementId={announcementId} />
      </ErrorBoundary>
    </DashboardContentLayout>
  );
};
