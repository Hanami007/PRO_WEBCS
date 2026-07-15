"use client";

import DashboardContentHeader from "@/components/dashboard-content-header";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { Separator } from "@/components/ui/separator";
import { DashboardMisRepairRequestList } from "@/features/mis-repair-request/components/dashboard/dashboard-mis-repair-request-list";

const DashboardMisRepairRequest = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="ระบบแจ้งของพัง"
        description="จัดการรายการแจ้งซ่อมอุปกรณ์และครุภัณฑ์ที่ชำรุด"
      />
      <Separator />
      <DashboardMisRepairRequestList />
    </DashboardContentLayout>
  );
};

export default DashboardMisRepairRequest;
