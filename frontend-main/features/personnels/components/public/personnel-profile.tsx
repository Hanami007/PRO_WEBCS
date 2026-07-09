"use client";

import { Personnel } from "../../types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Lightbulb, 
  FlaskConical,
  UserCircle,
  Lock
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export const PersonnelProfile = ({ personnel }: { personnel: Personnel }) => {
  const profile = personnel.profile;
  const isPublic = profile?.isPublic ?? false;

  // If not public or no profile, show the single "Private" block style (Empty component)
  if (!profile || !isPublic) {
    return (
      <Card className="overflow-hidden border-none shadow-sm bg-muted/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold">ข้อมูลรายละเอียด</CardTitle>
        </CardHeader>
        <CardContent className="py-12">
          <Empty className="bg-transparent border-none shadow-none">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Lock className="size-6" />
              </EmptyMedia>
              <EmptyTitle>ข้อมูลไม่เปิดเผยต่อสาธารณะ</EmptyTitle>
              <EmptyDescription>
                ขออภัย บุคลากรท่านนี้ยังไม่ได้เปิดเผยข้อมูลรายละเอียดเพิ่มเติมต่อสาธารณะ
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  const sections = [
    {
      id: "bio",
      title: "ประวัติโดยย่อ (Bio)",
      icon: <UserCircle className="size-5 text-primary" />,
      content: profile.bio,
    },
    {
      id: "education",
      title: "วุฒิการศึกษา (Education)",
      icon: <GraduationCap className="size-5 text-primary" />,
      content: personnel.education, // From personnel
    },
    {
      id: "workplace",
      title: "สถานที่ทำงาน (Workplace)",
      icon: <Briefcase className="size-5 text-primary" />,
      content: profile.workplace,
    },
    {
      id: "skills",
      title: "ทักษะและความสามารถ (Skills)",
      icon: <Wrench className="size-5 text-primary" />,
      content: profile.skills,
    },
    {
      id: "experts",
      title: "ความเชี่ยวชาญ (Expertise)",
      icon: <Lightbulb className="size-5 text-primary" />,
      content: profile.experts,
    },
    {
      id: "experiences",
      title: "ประสบการณ์ทำงาน (Experience)",
      icon: <Briefcase className="size-5 text-primary" />,
      content: profile.experiences,
    },
    {
      id: "researches",
      title: "ผลงานวิจัย (Research)",
      icon: <FlaskConical className="size-5 text-primary" />,
      content: profile.researches,
    },
  ];

  return (
    <Card className="overflow-hidden border-none shadow-sm bg-muted/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">ข้อมูลรายละเอียด</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pb-12">
        {sections.map((section, index) => {
          if (!section.content) return null;

          return (
            <div key={section.id} className="space-y-4">
              {index > 0 && <Separator className="mb-8 opacity-50" />}
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-background shadow-sm">
                  {section.icon}
                </div>
                <h3 className="font-bold text-lg text-foreground">{section.title}</h3>
              </div>

              <div className="pl-12">
                <div className="text-foreground whitespace-pre-line text-sm leading-relaxed">
                  {section.content}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
