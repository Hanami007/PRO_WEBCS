import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  getAlumni,
  getAlumniQueryOption,
} from "@/features/alumnis/api/get-alumni";
import { DashboardAlumni } from "./_components/dashboard-alumni";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ alumniId: string }>;
}) => {
  const alumniId = (await params).alumniId;
  const alumni = await getAlumni({ alumniId });

  return {
    title: alumni?.fullName,
    description: alumni?.quote,
  };
};

const preloadData = async (alumniId: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getAlumniQueryOption(alumniId));

  return {
    dehydratedState: dehydrate(queryClient),
    queryClient,
  };
};

const DashboardAlumniPage = async ({
  params,
}: {
  params: Promise<{ alumniId: string }>;
}) => {
  const alumniId = (await params).alumniId;

  const { dehydratedState, queryClient } = await preloadData(alumniId);

  const alumni = queryClient.getQueryData(
    getAlumniQueryOption(alumniId).queryKey,
  );

  if (!alumni) return <div>Alumni not found</div>;
  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardAlumni alumniId={alumniId} />
    </HydrationBoundary>
  );
};

export default DashboardAlumniPage;
