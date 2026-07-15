import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMisRepairRequestsQueryOptions } from "@/features/mis-repair-request/api/get-mis-repair-requests";
import DashboardMisRepairRequest from "./_components/dashboard-mis-repair-request";

export const metadata = {
  title: "แจ้งของพัง",
  description: "จัดการรายการแจ้งซ่อมอุปกรณ์และครุภัณฑ์ที่ชำรุด",
};

const DashboardMisRepairRequestPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getMisRepairRequestsQueryOptions({ page, limit, search }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardMisRepairRequest />
    </HydrationBoundary>
  );
};

export default DashboardMisRepairRequestPage;
