"use client";

import { Spinner } from "@/components/ui/spinner";
import { usePersonnel } from "../../api/get-personnel";
import Image from "next/image";
import { Mail, Phone, GraduationCap, Briefcase, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PersonnelProfile } from "./personnel-profile";

const PersonnelView = ({ personnelId }: { personnelId: string }) => {
  const personnelQuery = usePersonnel({ personnelId });

  if (personnelQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const personnel = personnelQuery?.data;

  if (!personnel) return null;

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Basic Information */}
        <div className="md:col-span-4 lg:col-span-3 space-y-6">
          <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="relative aspect-square w-full max-w-[280px] md:max-w-none overflow-hidden rounded-2xl border-4 border-background bg-muted shadow-xl">
              <Image
                className="object-cover"
                src={personnel.profileImage?.url || "/cs-logo.svg"}
                alt={personnel.fullnameEn || "Personnel"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>

            <div className="text-center md:text-left space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground leading-tight">
                {personnel.prefix}
                {personnel.fullnameTh}
              </h1>
              <p className="text-lg font-medium text-muted-foreground">
                {personnel.fullnameEn}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <Briefcase className="size-5 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  ตำแหน่งทางวิชาการ
                </p>
                <p className="font-medium text-foreground">
                  {personnel.academicPosition || "-"}
                </p>
              </div>
            </div>

            {personnel.administrativePosition && (
              <div className="flex items-start gap-3">
                <User className="size-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    ตำแหน่งบริหาร
                  </p>
                  <p className="font-medium text-foreground">
                    {personnel.administrativePosition}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Mail className="size-5 mt-0.5 text-primary shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  อีเมล
                </p>
                <p className="font-medium text-foreground truncate">
                  {personnel.email || "-"}
                </p>
              </div>
            </div>

            {personnel.phoneNumber && (
              <div className="flex items-start gap-3">
                <Phone className="size-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    เบอร์โทรศัพท์
                  </p>
                  <p className="font-medium text-foreground">
                    {personnel.phoneNumber}
                  </p>
                </div>
              </div>
            )}

            {personnel.education && (
              <div className="flex items-start gap-3">
                <GraduationCap className="size-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    วุฒิการศึกษา
                  </p>
                  <p className="font-medium text-foreground whitespace-pre-line text-sm leading-relaxed">
                    {personnel.education}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Data Side */}
        <div className="md:col-span-8 lg:col-span-9">
          <PersonnelProfile personnel={personnel} />
        </div>
      </div>
    </section>
  );
};

export default PersonnelView;
