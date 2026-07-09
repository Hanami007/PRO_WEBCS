"use client";

import {
  Calendar,
  Award,
  Languages,
  LucideIcon,
  Hash,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import React from "react";
import { Program } from "@/features/programs/types/api";
import { Badge } from "@/components/ui/badge";

type ProgramDetailCardProps = {
  label: string;
  icon: LucideIcon;
  value: string | number;
};

const ProgramDetailCard = ({
  label,
  icon: Icon,
  value,
}: ProgramDetailCardProps) => {
  return (
    <div className="rounded-xl p-5 border bg-card/50">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground/70">
          <Icon className="h-4 w-4" />
          <p className="text-[10px] font-bold uppercase tracking-widest">
            {label}
          </p>
        </div>
        <p className="font-semibold text-xl text-foreground/90">{value}</p>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-1 border-b border-border/50 last:border-0">
    <span className="text-muted-foreground text-base">{label}</span>
    <span className="font-medium text-foreground text-base text-right">
      {value}
    </span>
  </div>
);

const ProgramOverview = ({ program }: { program: Program }) => {
  const {
    duration,
    credits,
    degreeEn,
    languages,
    nameEn,
    nameTh,
    code,
    revision,
    degreeEnFull,
    degreeThFull,
    degreeTh,
    isCurrent,
    isActive,
    tqf,
  } = program;

  return (
    <div className="space-y-16">
      {/* Quick Stats Grid - Minimalist */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ProgramDetailCard
          label="Duration"
          icon={Calendar}
          value={`${duration} Yrs`}
        />
        <ProgramDetailCard label="Credits" icon={BookOpen} value={credits} />
        <ProgramDetailCard label="Degree" icon={Award} value={degreeEn} />
        <ProgramDetailCard
          label="Language"
          icon={Languages}
          value={languages}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main Details Section */}
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Identification
              </h3>
              <div className="flex gap-2">
                {isCurrent && (
                  <Badge variant="outline" className="text-[10px] font-bold">
                    Current
                  </Badge>
                )}
                {isActive && (
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold text-green-600 border-green-200"
                  >
                    Active
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <InfoRow label="Program Code" value={code} />
              <InfoRow label="Revision" value={revision} />
              <InfoRow label="Name (English)" value={nameEn} />
              <InfoRow label="Name (Thai)" value={nameTh} />
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 flex items-center gap-2 border-b pb-3">
              <Award className="h-4 w-4" />
              Degree Titles
            </h3>
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                  English Title
                </p>
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  {degreeEnFull}
                </p>
                <p className="text-sm text-muted-foreground/70 italic">
                  ({degreeEn})
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                  Thai Title
                </p>
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  {degreeThFull}
                </p>
                <p className="text-sm text-muted-foreground/70 italic">
                  ({degreeTh})
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Side Requirements Section */}
        <div className="lg:border-l lg:pl-16 space-y-12">
          <section className="space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 flex items-center gap-2 border-b pb-3">
              <CheckCircle2 className="h-4 w-4" />
              Academic Requirements
            </h3>
            <div className="space-y-8">
              <div className="flex justify-between items-baseline">
                <span className="text-base text-muted-foreground">
                  Min. Credits
                </span>
                <span className="text-3xl font-light tracking-tight">
                  {credits}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-base text-muted-foreground">
                  Duration
                </span>
                <span className="text-3xl font-light tracking-tight">
                  {duration}{" "}
                  <span className="text-sm font-normal text-muted-foreground/50">
                    Years
                  </span>
                </span>
              </div>

              <div className="pt-6 space-y-5">
                {tqf ? (
                  <div className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                    <span>
                      Thailand Quality Framework (TQF) documents verified.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                    <span>TQF documentation pending review.</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Languages className="h-4 w-4 text-muted-foreground/70" />
                  <span>Instructional Language: {languages}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProgramOverview;
