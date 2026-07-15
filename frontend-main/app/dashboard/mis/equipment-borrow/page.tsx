import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMisEquipmentBorrowsQueryOptions } from "@/features/mis-equipment-borrow/api/get-mis-equipment-borrows";
import DashboardMisEquipmentBorrow from "./_components/dashboard-mis-equipment-borrow";

export const metadata = {
  title: "ยืม-คืนครุภัณฑ์",
  description: "จัดการรายการยืม-คืนครุภัณฑ์และอุปกรณ์",
};

const DashboardMisEquipmentBorrowPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getMisEquipmentBorrowsQueryOptions({ page, limit, search }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardMisEquipmentBorrow />
    </HydrationBoundary>
  );
};

export default DashboardMisEquipmentBorrowPage;
