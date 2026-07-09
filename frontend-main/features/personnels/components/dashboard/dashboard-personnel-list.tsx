"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { useSearchParams } from "next/navigation";
import { usePersonnels } from "../../api/get-personnels";
import { personnelsColumns } from "./dashboard-personnel-columns";
import { Spinner } from "@/components/ui/spinner";

export const DashboardPersonnelList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const personnelQuery = usePersonnels({
    page: page,
    limit: limit,
    search: search,
  });

  if (personnelQuery.isPending && !personnelQuery.data) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const personnels = personnelQuery?.data?.data || [];
  const meta = personnelQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={personnelsColumns}
        data={personnels}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาชื่อหรืออีเมล..."
      />
    </div>
  );
};
