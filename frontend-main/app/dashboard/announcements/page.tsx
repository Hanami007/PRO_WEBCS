import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardAnnouncements from "./_components/dashboard-announcements";
import { getAnnouncementsQueryOptions } from "@/features/announcements/api/get-announcements";

export const metadata = {
  title: "Announcements",
  description: "Announcements Dashboard",
};

const DashboardAnnouncementsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = (searchParams.search as string) || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getAnnouncementsQueryOptions({
      page,
      limit,
      search,
    }),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardAnnouncements />
    </HydrationBoundary>
  );
};

export default DashboardAnnouncementsPage;
