import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import Contact from "./_components/contacts";
import { getContactsQueryOptions } from "@/features/contacts/api/get-contacts";

export const metadata = {
  title: "Contact",
  description:
    "Contact information for Department of Computer Science, Maejo University",
};

const Contactpage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getContactsQueryOptions({
      page: 1,
      limit: 8,
      "filter.isActive": `$eq:${true}`,
    }),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Contact />
    </HydrationBoundary>
  );
};

export default Contactpage;
