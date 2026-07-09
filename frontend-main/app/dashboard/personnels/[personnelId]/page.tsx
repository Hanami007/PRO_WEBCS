import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPersonnelQueryOptions } from "@/features/personnels/api/get-personnel";
import { EditPersonnel } from "@/features/personnels/components/dashboard/edit-personnel";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";

type PageProps = {
  params: Promise<{ personnelId: string }>;
};

export default async function EditPersonnelPage({ params }: PageProps) {
  const { personnelId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getPersonnelQueryOptions(personnelId));
  const dehydratedState = dehydrate(queryClient);

  return (
    <DashboardContentLayout>
    <HydrationBoundary state={dehydratedState}>
        <EditPersonnel personnelId={personnelId} />
    </HydrationBoundary>
    </DashboardContentLayout>
  );
}