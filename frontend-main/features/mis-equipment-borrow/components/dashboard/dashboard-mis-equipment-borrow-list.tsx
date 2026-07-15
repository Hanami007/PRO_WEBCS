"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { useMisEquipmentBorrows } from "../../api/get-mis-equipment-borrows";
import { misEquipmentBorrowColumns } from "./mis-equipment-borrow-columns";

export const DashboardMisEquipmentBorrowList = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const query = useMisEquipmentBorrows({ page, limit, search });

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
        columns={misEquipmentBorrowColumns}
        data={data}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาชื่อผู้ยืม หรืออุปกรณ์..."
      />
    </div>
  );
};
