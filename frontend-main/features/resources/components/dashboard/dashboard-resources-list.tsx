"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { useResources } from "../../api/get-resources";
import { resourceColumns } from "./resource-columns";

const DashboardResourcesList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const resourcesQuery = useResources({
    page: page,
    limit: limit,
    search: search,
  });

  if (resourcesQuery.isPending && !resourcesQuery.data) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const resources = resourcesQuery?.data?.data || [];
  const meta = resourcesQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={resourceColumns}
        data={resources}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาทรัพยากร..."
      />
    </div>
  );
};

export default DashboardResourcesList;
