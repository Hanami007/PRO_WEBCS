"use client";

import React from "react";
import { usePrograms } from "../../api/get-programs";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/ui/data-table";
import { programsColumns } from "./program-columns";

const DashboardProgramList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const programsQuery = usePrograms({
    page: page,
    limit: limit,
    search: search,
  });

  if (programsQuery.isPending && !programsQuery.data) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const programs = programsQuery?.data?.data || [];
  const meta = programsQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={programsColumns}
        data={programs}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาหลักสูตร..."
      />
    </div>
  );
};

export default DashboardProgramList;
