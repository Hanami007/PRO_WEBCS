import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import Facilities from "./_components/facilities";
import { getBuildingsQueryOptions } from "@/features/buildings/api/get-buildings";
import { getRoomsQueryOptions } from "@/features/rooms/api/get-rooms";

export const metadata = {
  title: "Facilities",
  description: "Facilities at Department of Computer Science, Maejo University",
};

const FacilitiesPage = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getBuildingsQueryOptions({ limit: 100 })),
    queryClient.prefetchQuery(getRoomsQueryOptions({ limit: 100 })),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Facilities />
    </HydrationBoundary>
  );
};

export default FacilitiesPage;
