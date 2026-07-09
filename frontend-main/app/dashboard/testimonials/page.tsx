import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTestimonialsQueryOptions } from "@/features/testimonials/api/get-testimonials";
import DashboardTestimonials from "./_components/dashboard-testimonials";

export const metadata = {
  title: "Testimonials Management",
  description: "Manage your student and alumni reviews.",
};

const DashboardTestimonialsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getTestimonialsQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardTestimonials />
    </HydrationBoundary>
  );
};

export default DashboardTestimonialsPage;
