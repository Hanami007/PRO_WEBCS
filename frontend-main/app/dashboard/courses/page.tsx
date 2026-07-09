import { getCoursesQueryOptions } from "@/features/courses/api/get-courses";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import DashboardCourses from "./_components/dashboard-courses";

export const metadata = {
  title: "Courses",
  description: "Manage your department courses.",
};

const DashboardCoursesPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getCoursesQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardCourses />
    </HydrationBoundary>
  );
};

export default DashboardCoursesPage;
