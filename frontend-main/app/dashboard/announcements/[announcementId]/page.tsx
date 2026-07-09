import {
  getAnnouncement,
  getAnnouncementQueryOptions,
} from "@/features/announcements/api/get-announcement";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { DashboardAnnouncement } from "./_components/dashboard-announcement";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ announcementId: string }>;
}) => {
  const announcementId = (await params).announcementId;
  const announcement = await getAnnouncement({ announcementId });

  return {
    title: announcement?.title,
    description: announcement?.description,
  };
};

const preloadData = async (announcementId: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getAnnouncementQueryOptions(announcementId));

  return {
    dehydratedState: dehydrate(queryClient),
    queryClient,
  };
};

const DashboardAnnouncementPage = async ({
  params,
}: {
  params: Promise<{ announcementId: string }>;
}) => {
  const announcementId = (await params).announcementId;

  const { dehydratedState, queryClient } = await preloadData(announcementId);

  const announcement = queryClient.getQueryData(
    getAnnouncementQueryOptions(announcementId).queryKey,
  );

  if (!announcement) return <div>Announcement not found</div>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardAnnouncement announcementId={announcementId} />
    </HydrationBoundary>
  );
};

export default DashboardAnnouncementPage;
