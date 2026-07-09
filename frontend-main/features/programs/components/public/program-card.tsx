"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { paths } from "@/config/paths";
import { Program } from "../../types/api";
import { BookOpen, Clock } from "lucide-react";

type ProgramCardProps = {
  program: Program;
};

export const ProgramCard = ({ program }: ProgramCardProps) => {
  return (
    <Link
      href={paths.program.getHref(program.id)}
      className="group block"
    >
      <Card className="border rounded-2xl bg-card/30 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6 px-8 pt-8">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
              {program.nameEn}
            </CardTitle>
            <p className="text-base text-muted-foreground font-medium leading-relaxed">
              {program.nameTh} ({program.revision})
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="px-8 pb-8 space-y-8">
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-light tracking-tight text-foreground/90">{program.credits}</span>
                <span className="text-xs font-bold uppercase tracking-tighter text-muted-foreground/50">Credits</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 flex items-center gap-1.5 mt-1">
                <BookOpen className="h-3 w-3" /> Total
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-light tracking-tight text-foreground/90">{program.duration}</span>
                <span className="text-xs font-bold uppercase tracking-tighter text-muted-foreground/50">Years</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 flex items-center gap-1.5 mt-1">
                <Clock className="h-3 w-3" /> Duration
              </span>
            </div>

            <div className="flex flex-col h-full justify-center pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground/60">
                <div className="h-1.5 w-1.5 rounded-full bg-border" />
                <span>Language: {program.languages}</span>
              </div>
              {program.tqf && (
                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-muted-foreground/60">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span>Standard TQF Available</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
