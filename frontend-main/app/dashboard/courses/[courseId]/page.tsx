import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import React from "react";
import DashboardCourse from "./_components/dashboard-course";
import {
  getCourse,
  getCourseQueryOption,
} from "@/features/courses/api/get-course";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const courseId = (await params).courseId;

  const course = await getCourse({ courseId });

  return {
    title: course.titleEn,
  };
};

const preloadData = async (courseId: string) => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getCourseQueryOption(courseId)),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

const DashboardCoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const courseId = (await params).courseId;
  const { dehydratedState, queryClient } = await preloadData(courseId);

  const course = queryClient.getQueryData(
    getCourseQueryOption(courseId).queryKey
  );

  if (!course) return <div>Course not found</div>;
  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardCourse courseId={courseId} />
    </HydrationBoundary>
  );
};

export default DashboardCoursePage;
