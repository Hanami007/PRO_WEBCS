import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardRooms from "./_components/dashboard-rooms";
import { getRoomsQueryOptions } from "@/features/rooms/api/get-rooms";

export const metadata = {
  title: "Rooms Management",
  description: "Manage campus rooms and their facilities.",
};

const DashboardRoomsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getRoomsQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardRooms />
    </HydrationBoundary>
  );
};

export default DashboardRoomsPage;
