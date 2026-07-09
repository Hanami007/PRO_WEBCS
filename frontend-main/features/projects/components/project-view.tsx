"use client";

import { useProjects } from "../api/get-projects";
import { QueryPagination } from "@/components/query-pagination";
import { ProjectCard } from "./project-card";
import { QueryLimit } from "@/components/query-limit";
import { QuerySearch } from "@/components/query-search";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectTable } from "./project-table";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

const ProjectView = () => {
  const [page] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );
  const [search] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );
  const [limit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(12).withOptions({ shallow: false }),
  );
  const [viewMode, setViewMode] = useQueryState(
    "view",
    parseAsString
      .withDefault("card")
      .withOptions({ shallow: false, scroll: false }),
  );

  const projectsQuery = useProjects({
    page,
    limit,
    search,
  });

  const projects = projectsQuery.data?.data || [];
  const meta = projectsQuery.data?.meta;

  if (projectsQuery.isError)
    return (
      <div className="text-center py-20 border rounded-2xl border-dashed text-destructive bg-destructive/5">
        <p className="text-sm font-medium">
          Failed to load projects. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <SectionHeader
          subtitle="Project Archive"
          title="Student Projects"
          className="w-full lg:w-auto"
        />

        <div className="flex flex-col items-center lg:items-end gap-4 w-full max-w-md">
          <div className="flex w-full gap-2">
            <QuerySearch
              placeholder="Search by code, title, or authors..."
              className="flex-1"
            />
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
                onClick={() => void setViewMode("card")}
                title="Card View"
              >
                <LayoutGrid
                  className={`size-5 transition-colors duration-200 ${
                    viewMode === "card"
                      ? "text-primary opacity-100"
                      : "text-muted-foreground opacity-50 hover:opacity-100"
                  }`}
                />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
                onClick={() => void setViewMode("table")}
                title="Table View"
              >
                <List
                  className={`size-5 transition-colors duration-200 ${
                    viewMode === "table"
                      ? "text-primary opacity-100"
                      : "text-muted-foreground opacity-50 hover:opacity-100"
                  }`}
                />
              </Button>
            </div>
          </div>
          <QueryLimit />
        </div>
      </div>

      {projectsQuery.isLoading ? (
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-muted/30 animate-pulse rounded-2xl border border-border/50"
            />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <>
          {viewMode === "card" ? (
            <div className="flex flex-col gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <ProjectTable projects={projects} />
          )}
        </>
      ) : (
        <div className="text-center py-20 border rounded-2xl border-dashed text-muted-foreground bg-muted/10">
          <p className="text-sm font-medium">
            No projects found matching your search.
          </p>
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="pt-8 flex justify-center">
          <QueryPagination meta={meta} />
        </div>
      )}
    </div>
  );
};

export default ProjectView;
