"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Clock, Wrench, CheckCircle2 } from "lucide-react";
import { useMisRepairRequests } from "../../api/get-mis-repair-requests";

export const RepairProgressTab = () => {
  const { data: requestsData, isLoading } = useMisRepairRequests({ limit: 500 });
  const items = requestsData?.data || [];

  const total = items.length;
  const pending = items.filter((i) => i.status === "pending").length;
  const inProgress = items.filter((i) => i.status === "in_progress").length;
  const resolved = items.filter((i) => i.status === "resolved").length;

  const resolvedPercent = total > 0 ? Math.round((resolved / total) * 100) : 0;

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">กำลังโหลดข้อมูลความคืบหน้า...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-blue-500" />
          ความคืบหน้าการทำงาน
        </h2>
        <Badge variant="outline" className="text-sm font-normal">
          ความเสร็จสิ้น: {resolvedPercent}%
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span>ความคืบหน้าการซ่อมบำรุงทั้งหมด</span>
          <span>{resolved} จาก {total} รายการสำเร็จ</span>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${total > 0 ? (resolved / total) * 100 : 0}%` }}
          />
          <div
            className="h-full bg-amber-500 transition-all duration-500"
            style={{ width: `${total > 0 ? (inProgress / total) * 100 : 0}%` }}
          />
          <div
            className="h-full bg-slate-400 transition-all duration-500"
            style={{ width: `${total > 0 ? (pending / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              รายการทั้งหมด
            </CardTitle>
            <PieChart className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{total}</div>
            <p className="text-xs text-slate-400 mt-1">รายการแจ้งซ่อมทั้งหมดในระบบ</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              รอดำเนินการ
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pending}</div>
            <p className="text-xs text-slate-400 mt-1">รอดำเนินการตรวจสอบ/จัดซื้อ</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              กำลังซ่อม
            </CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{inProgress}</div>
            <p className="text-xs text-slate-400 mt-1">อยู่ระหว่างการดำเนินการซ่อมแซม</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              ซ่อมเสร็จสิ้น
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{resolved}</div>
            <p className="text-xs text-slate-400 mt-1">ได้รับการแก้ไข/ซ่อมเสร็จแล้ว</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
