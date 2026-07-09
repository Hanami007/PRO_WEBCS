"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { useEvents } from "../../api/get-events";
import { eventColumns } from "./event-columns";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";

export const DashboardEventsList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const eventsQuery = useEvents({
    page: page,
    limit: limit,
    search: search,
  });

  if (eventsQuery.isPending && !eventsQuery.data) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const data = eventsQuery.data?.data || [];
  const meta = eventsQuery.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={eventColumns}
        data={data}
        pageCount={pageCount}
        searchPlaceholder="ค้นหากิจกรรม..."
      />
    </div>
  );
};
