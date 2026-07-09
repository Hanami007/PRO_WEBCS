import Footer from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { env } from "@/config/env";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { getActiveAnnouncementsQueryOptions } from "@/features/announcements/api/get-active-announcements";
import { getResourceByKeyQueryOptions } from "@/features/resources/api/get-resource-by-key";

export const metadata: Metadata = {
  title: {
    template: `%s | CSMJU`,
    default: env.APP_NAME,
  },
  description: env.APP_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient({
    defaultOptions: queryConfig,
  });

  await Promise.all([
    queryClient.prefetchQuery(getActiveAnnouncementsQueryOptions()),
    queryClient.prefetchQuery(getResourceByKeyQueryOptions("youtube_link")),
    queryClient.prefetchQuery(getResourceByKeyQueryOptions("line_link")),
    queryClient.prefetchQuery(getResourceByKeyQueryOptions("facebook_link")),
    queryClient.prefetchQuery(getResourceByKeyQueryOptions("admission_link")),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </HydrationBoundary>
    </div>
  );
}
