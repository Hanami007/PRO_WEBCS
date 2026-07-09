"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { useSearchParams } from "next/navigation";
import { useRooms } from "../../api/get-rooms";
import { roomsColumns } from "./dashboard-room-columns";
import { Spinner } from "@/components/ui/spinner";

export const DashboardRoomList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const roomQuery = useRooms({
    page: page,
    limit: limit,
    search: search,
  });

  if (roomQuery.isPending && !roomQuery.data) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const rooms = roomQuery?.data?.data || [];
  const meta = roomQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={roomsColumns}
        data={rooms}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาห้องเรียน..."
      />
    </div>
  );
};
