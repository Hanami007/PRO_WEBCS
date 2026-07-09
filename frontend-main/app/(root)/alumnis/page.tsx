import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import Alumnis from "./_components/alumni";
import { getAlumnisQueryOptions } from "@/features/alumnis/api/get-alumnis";

export const metadata = {
  title: "Alumni",
  description: "Alumni of Department of Computer Science, Maejo University",
};

const AlumniPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getAlumnisQueryOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Alumnis />
    </HydrationBoundary>
  );
};

export default AlumniPage;
