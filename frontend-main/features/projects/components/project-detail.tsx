"use client";

import { useProject } from "../api/get-project";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, User, Users, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

type ProjectDetailProps = {
  projectId: string;
};

const InfoRow = ({ label, value }: { label: string, value: string | number }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-1 border-b border-border/50 last:border-0">
    <span className="text-muted-foreground text-base">{label}</span>
    <span className="font-medium text-foreground text-base text-right">{value}</span>
  </div>
);

export const ProjectDetail = ({ projectId }: ProjectDetailProps) => {
  const router = useRouter();
  const projectQuery = useProject({ projectId });
  const project = projectQuery.data;

  if (projectQuery.isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (projectQuery.error || !project) {
    return (
      <div className="text-center py-20 border rounded-2xl border-dashed text-muted-foreground bg-muted/10">
        <p className="text-sm font-medium">Project information not found.</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div className="flex justify-start">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground -ml-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-12">
          {/* Abstract Section */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 flex items-center gap-2 border-b pb-3">
              <BookOpen className="h-4 w-4" />
              Abstract & Details
            </h3>
            <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
              <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {project.detail || "No additional details provided for this project."}
              </p>
            </div>
          </section>

          {/* Authors Section */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 flex items-center gap-2 border-b pb-3">
              <Users className="h-4 w-4" />
              Authors & Contributors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.editors.map((author, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl border bg-card/50 transition-all hover:border-primary/30"
                >
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center border shrink-0">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="text-base font-semibold text-foreground/90">{author}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Information */}
        <div className="lg:border-l lg:pl-16 space-y-12">
          {/* Committee Section */}
          <section className="space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 flex items-center gap-2 border-b pb-3">
              <GraduationCap className="h-4 w-4" />
              Academic Committee
            </h3>
            <div className="space-y-1">
              <InfoRow label="Advisor (Chairman)" value={project.chairman?.fullnameTh || "-"} />
              <InfoRow label="Committee Member 1" value={project.director1?.fullnameTh || "-"} />
              <InfoRow label="Committee Member 2" value={project.director2?.fullnameTh || "-"} />
            </div>
          </section>

          {/* Document Access Section */}
          <section className="space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 flex items-center gap-2 border-b pb-3">
              <FileText className="h-4 w-4" />
              Project Document
            </h3>
            <div className="space-y-6">
              {project.file?.url ? (
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">Document Available</p>
                    <p className="text-xs text-muted-foreground leading-tight">The full research paper is available for review.</p>
                  </div>
                  <Button
                    asChild
                    className="w-full mt-2"
                  >
                    <a href={project.file.url} target="_blank" rel="noreferrer">
                      View Full PDF
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="bg-muted/30 border border-dashed rounded-2xl p-8 flex flex-col items-center text-center gap-3">
                  <FileText className="w-10 h-10 text-muted-foreground/30" />
                  <p className="text-xs font-medium text-muted-foreground italic">No full document available for this project revision.</p>
                </div>
              )}
              
              <div className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed px-2">
                <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-primary/60 shrink-0" />
                <span>This project is verified and archived by the Department of Computer Science.</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
