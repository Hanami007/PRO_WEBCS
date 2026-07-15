"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { useMisCoursePendings } from "../../api/get-mis-course-pendings";
import { misCoursePendingColumns } from "./mis-course-pending-columns";

export const DashboardMisCoursePendingList = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const query = useMisCoursePendings({ page, limit, search });

  if (query.isPending && !query.data) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const data = query.data?.data || [];
  const pageCount = query.data?.meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={misCoursePendingColumns}
        data={data}
        pageCount={pageCount}
        searchPlaceholder="ค้นหารหัสนักศึกษา ชื่อ หรือวิชา..."
      />
    </div>
  );
};
