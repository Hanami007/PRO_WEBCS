"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { useComplains } from "../../api/get-complains";
import { complainColumns } from "./complain-columns";

export const DashboardComplainList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const complainsQuery = useComplains({
    page: page,
    limit: limit,
    search: search,
  });

  if (complainsQuery.isPending && !complainsQuery.data) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const complains = complainsQuery?.data?.data || [];
  const meta = complainsQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={complainColumns}
        data={complains}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาเรื่องร้องเรียน..."
      />
    </div>
  );
};
