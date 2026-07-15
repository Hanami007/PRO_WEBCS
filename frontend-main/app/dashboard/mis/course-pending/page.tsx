import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMisCoursePendingsQueryOptions } from "@/features/mis-course-pending/api/get-mis-course-pendings";
import DashboardMisCoursePending from "./_components/dashboard-mis-course-pending";

export const metadata = {
  title: "แจ้งตกค้างรายวิชา",
  description: "จัดการรายการแจ้งตกค้างรายวิชาของนักศึกษา",
};

const DashboardMisCoursePendingPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getMisCoursePendingsQueryOptions({ page, limit, search }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardMisCoursePending />
    </HydrationBoundary>
  );
};

export default DashboardMisCoursePendingPage;
