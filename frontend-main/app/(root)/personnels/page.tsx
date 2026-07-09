import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { getPersonnelsQueryOptions } from "@/features/personnels/api/get-personnels";
import Personnels from "./_components/personnels";

export const metadata = {
  title: "Personnel",
  description: "A page showing departments personnel",
};

const PersonnelsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getPersonnelsQueryOptions({
      page: 1,
      limit: 100,
      sortBy: "fullnameTh:ASC",
      "filter.workStatus.name": "$eq:ทำงานปกติ",
    }),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Personnels />
    </HydrationBoundary>
  );
};

export default PersonnelsPage;
