import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Programs from "./_components/programs";
import { getProgramsQueryOptions } from "@/features/programs/api/get-programs";

export const metadata = {
  title: "Programs",
  description:
    "Curriculum overview at Department of Computer Science, Maejo University",
};

const CurriculumPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getProgramsQueryOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Programs />
    </HydrationBoundary>
  );
};

export default CurriculumPage;
