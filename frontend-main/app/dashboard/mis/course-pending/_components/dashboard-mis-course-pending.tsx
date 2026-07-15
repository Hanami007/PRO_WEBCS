"use client";

import DashboardContentHeader from "@/components/dashboard-content-header";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { Separator } from "@/components/ui/separator";
import { DashboardMisCoursePendingList } from "@/features/mis-course-pending/components/dashboard/dashboard-mis-course-pending-list";

const DashboardMisCoursePending = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="ระบบแจ้งตกค้างรายวิชา"
        description="จัดการรายการแจ้งตกค้างรายวิชาของนักศึกษา"
      />
      <Separator />
      <DashboardMisCoursePendingList />
    </DashboardContentLayout>
  );
};

export default DashboardMisCoursePending;
