"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { useSearchParams } from "next/navigation";
import { useAlumnis } from "../../api/get-alumnis";
import { alumnisColumns } from "./dashboard-alumni-columns";
import { Spinner } from "@/components/ui/spinner";

export const DashboardAlumniList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const alumniQuery = useAlumnis({
    page: page,
    limit: limit,
    search: search,
  });

  if (alumniQuery.isPending && !alumniQuery.data) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const alumnis = alumniQuery?.data?.data || [];
  const meta = alumniQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={alumnisColumns}
        data={alumnis}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาศิษย์เก่า..."
      />
    </div>
  );
};
