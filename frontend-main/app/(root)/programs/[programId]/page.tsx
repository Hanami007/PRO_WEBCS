import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Program from "./_components/program";
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
    description: program.degreeEnFull,
  };
};

const preloadData = async (programId: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getProgramQueryOptions(programId));

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

const ProgramPage = async ({
  params,
}: {
  params: Promise<{ programId: string }>;
}) => {
  const programId = (await params).programId;

  const { dehydratedState, queryClient } = await preloadData(programId);

  const program = queryClient.getQueryData(
    getProgramQueryOptions(programId).queryKey,
  );

  if (!program) {
    return <div>Program not found</div>;
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <Program programId={programId} />
    </HydrationBoundary>
  );
};

export default ProgramPage;
