"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, ListFilter, Wrench, Key } from "lucide-react";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { DashboardMisRepairRequestList } from "@/features/mis-repair-request/components/dashboard/dashboard-mis-repair-request-list";
import { RepairProgressTab } from "@/features/mis-repair-request/components/dashboard/repair-progress-tab";
import { LineTokenTab } from "@/features/mis-repair-request/components/dashboard/line-token-tab";

const DashboardMisRepairRequest = () => {
  return (
    <DashboardContentLayout>
      <div className="space-y-6">
        {/* Main Title Header */}
        <div className="text-center py-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            CSMJU | ระบบแจ้งซ่อมอุปกรณ์
          </h1>
        </div>

        {/* Top Navigation Tabs */}
        <Tabs defaultValue="list" className="w-full space-y-6">
          <div className="flex justify-center">
            <TabsList className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl flex flex-wrap justify-center gap-1 border border-slate-200 dark:border-slate-800 shadow-sm">
              <TabsTrigger
                value="progress"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
              >
                <PieChart className="w-4 h-4" />
                ความคืบหน้าการทำงาน
              </TabsTrigger>

              <TabsTrigger
                value="list"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
              >
                <ListFilter className="w-4 h-4" />
                รายการแจ้งซ่อม
              </TabsTrigger>

              <TabsTrigger
                value="history"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
              >
                <Wrench className="w-4 h-4" />
                ประวัติการซ่อม
              </TabsTrigger>

              <TabsTrigger
                value="line-token"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
              >
                <Key className="w-4 h-4" />
                เพิ่ม Line Token
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab 1: ความคืบหน้าการทำงาน */}
          <TabsContent value="progress" className="mt-4 focus-visible:outline-none">
            <RepairProgressTab />
          </TabsContent>

          {/* Tab 2: รายการแจ้งซ่อม (Default Active) */}
          <TabsContent value="list" className="mt-4 focus-visible:outline-none">
            <DashboardMisRepairRequestList statusFilter="active" />
          </TabsContent>

          {/* Tab 3: ประวัติการซ่อม */}
          <TabsContent value="history" className="mt-4 focus-visible:outline-none">
            <DashboardMisRepairRequestList statusFilter="resolved" />
          </TabsContent>

          {/* Tab 4: เพิ่ม Line Token */}
          <TabsContent value="line-token" className="mt-4 focus-visible:outline-none">
            <LineTokenTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardContentLayout>
  );
};

export default DashboardMisRepairRequest;
