import {
  getPersonnel,
  getPersonnelQueryOptions,
} from "@/features/personnels/api/get-personnel";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Personnel from "./_components/personnel";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ personnelId: string }>;
}) => {
  const personnelId = (await params).personnelId;

  const personnel = await getPersonnel({ personnelId });

  return {
    title: personnel.fullnameEn,
    description: personnel.fullnameEn,
  };
};

const preloadData = async (personnelId: string) => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getPersonnelQueryOptions(personnelId)),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

const PersonnelPage = async ({
  params,
}: {
  params: Promise<{ personnelId: string }>;
}) => {
  const personnelId = (await params).personnelId;

  const { dehydratedState, queryClient } = await preloadData(personnelId);

  const personnel = queryClient.getQueryData(
    getPersonnelQueryOptions(personnelId).queryKey,
  );

  if (!personnel) return <div>Personnel not found</div>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <Personnel personnelId={personnelId} />
    </HydrationBoundary>
  );
};

export default PersonnelPage;
