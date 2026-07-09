import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import About from "./_component/about";
import { getAboutSectionsQueryOptions } from "@/features/abouts/api/get-about-sections";

export const metadata = {
  title: "About",
  description: "About Department of Computer Science, Maejo University",
};

const DepartmentPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getAboutSectionsQueryOptions({ sortBy: "sortOrder:ASC" }),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <About />
    </HydrationBoundary>
  );
};

export default DepartmentPage;
