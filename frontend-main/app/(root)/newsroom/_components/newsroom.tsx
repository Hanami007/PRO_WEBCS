"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { paths } from "@/config/paths";
import ArticlesPreview from "@/features/articles/components/articles-preview";
import { EventGanttChart } from "@/features/events/components/event-gantt-chart";
import Link from "next/link";

const Newsroom = () => {
  return (
    <ContentLayout title="Newsroom">
      <div className="space-y-12">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeader
              subtitle="Latest News"
              title="ข่าวสารและบทความล่าสุด"
              className="text-center lg:text-left"
            />

            <Button variant="outline" asChild className="w-full lg:w-auto">
              <Link href={paths.news.articles.getHref()}>View All</Link>
            </Button>
          </div>
          <ArticlesPreview limit={4} />
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeader
              subtitle="Events Timeline"
              title="ปฏิทินกิจกรรม"
              className="text-center lg:text-left"
            />
            <Button variant="outline" asChild className="w-full lg:w-auto">
              <Link href={paths.news.events.getHref()}>View All</Link>
            </Button>
          </div>
          <EventGanttChart />
        </div>
      </div>
    </ContentLayout>
  );
};

export default Newsroom;
