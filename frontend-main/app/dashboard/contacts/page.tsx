import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardContacts from "./_components/dashboard-contacts";
import { getContactsQueryOptions } from "@/features/contacts/api/get-contacts";

export const metadata = {
  title: "Contacts Management",
  description: "Manage your organization's contact details.",
};

const DashboardContactPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getContactsQueryOptions({
        page,
        limit,
        search,
      }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardContacts />
    </HydrationBoundary>
  );
};

export default DashboardContactPage;
