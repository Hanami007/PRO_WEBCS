import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import DashboardProgram from "./_components/dashboard-program";
import {
  getProgram,
  getProgramQueryOptions,
} from "@/features/programs/api/get-program";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ programId: string }>;
}) => {
  const programId = (await params).programId;

  const program = await getProgram({ programId });

  return {
    title: program.nameEn,
  };
};

const preloadData = async (programId: string) => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getProgramQueryOptions(programId)),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

const DashboardProgramPage = async ({
  params,
}: {
  params: Promise<{ programId: string }>;
}) => {
  const programId = (await params).programId;
  const { dehydratedState, queryClient } = await preloadData(programId);

  const program = queryClient.getQueryData(
    getProgramQueryOptions(programId).queryKey,
  );

  if (!program) return <div>Program not found</div>;
  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardProgram programId={programId} />
    </HydrationBoundary>
  );
};

export default DashboardProgramPage;
