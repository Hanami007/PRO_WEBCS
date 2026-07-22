"use client";

import React from "react";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { DashboardMisEquipmentBorrowList } from "@/features/mis-equipment-borrow/components/dashboard/dashboard-mis-equipment-borrow-list";

const DashboardMisEquipmentBorrow = () => {
  return (
    <DashboardContentLayout>
      <div className="space-y-6">
        {/* Main Title Header */}
        <div className="text-center py-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            CSMJU | ระบบยืม-คืนครุภัณฑ์
          </h1>
        </div>

        {/* List Content */}
        <DashboardMisEquipmentBorrowList />
      </div>
    </DashboardContentLayout>
  );
};

export default DashboardMisEquipmentBorrow;
