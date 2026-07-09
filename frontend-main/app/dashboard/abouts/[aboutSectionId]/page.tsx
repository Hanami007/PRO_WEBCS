import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAboutSectionQueryOption } from "@/features/abouts/api/get-about-section";
import DashboardAboutSection from "./_components/dashboard-about-section";
import { getAboutContentsQueryOptions } from "@/features/abouts/api/get-about-contents";

type PageProps = {
  params: Promise<{ aboutSectionId: string }>;
};

export default async function DashboardAboutSectionPage({ params }: PageProps) {
  const { aboutSectionId } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getAboutSectionQueryOption(aboutSectionId)),
    getAboutContentsQueryOptions({
      "filter.section.id": `$eq:${aboutSectionId}`,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardAboutSection aboutSectionId={aboutSectionId} />
    </HydrationBoundary>
  );
}
