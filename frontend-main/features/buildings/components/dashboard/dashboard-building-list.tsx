"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { useSearchParams } from "next/navigation";
import { useBuildings } from "../../api/get-buildings";
import { buildingsColumns } from "./dashboard-building-columns";
import { Spinner } from "@/components/ui/spinner";

export const DashboardBuildingList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const buildingQuery = useBuildings({
    page: page,
    limit: limit,
    search: search,
  });

  if (buildingQuery.isPending && !buildingQuery.data) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const buildings = buildingQuery?.data?.data || [];
  const meta = buildingQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={buildingsColumns}
        data={buildings}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาอาคาร..."
      />
    </div>
  );
};
