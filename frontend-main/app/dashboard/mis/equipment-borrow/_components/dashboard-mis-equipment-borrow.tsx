"use client";

import DashboardContentHeader from "@/components/dashboard-content-header";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { Separator } from "@/components/ui/separator";
import { DashboardMisEquipmentBorrowList } from "@/features/mis-equipment-borrow/components/dashboard/dashboard-mis-equipment-borrow-list";

const DashboardMisEquipmentBorrow = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="ระบบยืม-คืนครุภัณฑ์"
        description="จัดการรายการยืม-คืนครุภัณฑ์และอุปกรณ์"
      />
      <Separator />
      <DashboardMisEquipmentBorrowList />
    </DashboardContentLayout>
  );
};

export default DashboardMisEquipmentBorrow;
