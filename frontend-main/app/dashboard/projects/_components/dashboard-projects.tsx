"use client";

import React from "react";
import { DashboardProjectList } from "@/features/projects/components/dashboard/dashboard-project-list";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";

export const DashboardProjects = () => {
  return (
    <DashboardContentLayout>
      <div className="space-y-6">
        {/* Main Title Header */}
        <div className="text-center py-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            CSMJU | ระบบสืบค้นโครงงาน
          </h1>
        </div>

        {/* Project List */}
        <DashboardProjectList />
      </div>
    </DashboardContentLayout>
  );
};

export default DashboardProjects;
