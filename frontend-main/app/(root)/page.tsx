import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Root from "./_components/root";
import { getArticlesQueryOptions } from "@/features/articles/api/get-articles";
import { getFeaturesQueryOptions } from "@/features/features/api/get-features";
import { getCarouselsQueryOptions } from "@/features/carousels/api/get-carousels";
import { getTestimonialsQueryOptions } from "@/features/testimonials/api/get-testimonials";
import { getResourceByKeyQueryOptions } from "@/features/resources/api/get-resource-by-key";

export const metadata = {
  title: "Home | CSMJU",
  description: "Department of Computer Science, Maejo University",
};

const HomePage = async () => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(
      getCarouselsQueryOptions({
        page: 1,
        limit: 20,
        "filter.isActive": "$eq:true",
      }),
    ),
    queryClient.prefetchQuery(
      getFeaturesQueryOptions({
        limit: 10,
        sortBy: "createdAt:ASC",
        "filter.isActive": "$eq:true",
      }),
    ),
    queryClient.prefetchQuery(
      getTestimonialsQueryOptions({
        page: 1,
        limit: 10,
        "filter.isActive": "$eq:true",
      }),
    ),
    queryClient.prefetchQuery(getArticlesQueryOptions({ page: 1, limit: 4 })),
    queryClient.prefetchQuery(
      getResourceByKeyQueryOptions("introduction_video_id"),
    ),
  ]);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Root />
    </HydrationBoundary>
  );
};

export default HomePage;
