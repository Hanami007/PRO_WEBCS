"use client";

import React from "react";
import Link from "next/link";
import {
  Newspaper,
  CalendarDays,
  MessageSquare,
  Users,
  GraduationCap,
  BookOpen,
  Library,
  Briefcase,
  Plus,
  ArrowRight,
  User,
  Clock,
  Sparkles,
} from "lucide-react";

import { useUser } from "@/lib/auth";
import { useArticles } from "@/features/articles/api/get-articles";
import { useEvents } from "@/features/events/api/get-events";
import { useComplains } from "@/features/complains/api/get-complains";
import { usePersonnels } from "@/features/personnels/api/get-personnels";
import { useAlumnis } from "@/features/alumnis/api/get-alumnis";
import { useCourses } from "@/features/courses/api/get-courses";
import { useBuildings } from "@/features/buildings/api/get-buildings";
import { useRooms } from "@/features/rooms/api/get-rooms";
import { useProjects } from "@/features/projects/api/get-projects";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { paths } from "@/config/paths";
import { formatDate } from "@/lib/utils";

export const DashboardHome = () => {
  const user = useUser();

  // Fetch counts with minimal limits to optimize load times
  const articlesQuery = useArticles({ page: 1, limit: 5 });
  const eventsQuery = useEvents({ page: 1, limit: 5 });
  const complainsQuery = useComplains({ page: 1, limit: 5 });
  const personnelsQuery = usePersonnels({ page: 1, limit: 1 });
  const alumnisQuery = useAlumnis({ page: 1, limit: 1 });
  const coursesQuery = useCourses({ page: 1, limit: 1 });
  const buildingsQuery = useBuildings({ page: 1, limit: 1 });
  const roomsQuery = useRooms({ page: 1, limit: 1 });
  const projectsQuery = useProjects({ page: 1, limit: 1 });

  // Format date helper to prevent crash on invalid date strings
  const formatSafeDate = (dateStr: any) => {
    try {
      if (!dateStr) return "-";
      return formatDate(String(dateStr), "th-TH");
    } catch {
      return "-";
    }
  };

  const statCards = [
    {
      title: "บทความ",
      count: articlesQuery.data?.meta?.totalItems ?? 0,
      loading: articlesQuery.isLoading,
      icon: Newspaper,
      href: paths.dashboard.articles.getHref(),
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "กิจกรรม",
      count: eventsQuery.data?.meta?.totalItems ?? 0,
      loading: eventsQuery.isLoading,
      icon: CalendarDays,
      href: paths.dashboard.events.getHref(),
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "คำร้องเรียน",
      count: complainsQuery.data?.meta?.totalItems ?? 0,
      loading: complainsQuery.isLoading,
      icon: MessageSquare,
      href: paths.dashboard.complains.getHref(),
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      highlight: (complainsQuery.data?.meta?.totalItems ?? 0) > 0,
    },
    {
      title: "บุคลากร",
      count: personnelsQuery.data?.meta?.totalItems ?? 0,
      loading: personnelsQuery.isLoading,
      icon: Users,
      href: paths.dashboard.personnel.getHref(),
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      title: "ศิษย์เก่า",
      count: alumnisQuery.data?.meta?.totalItems ?? 0,
      loading: alumnisQuery.isLoading,
      icon: GraduationCap,
      href: paths.dashboard.alumnis.getHref(),
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      title: "รายวิชา",
      count: coursesQuery.data?.meta?.totalItems ?? 0,
      loading: coursesQuery.isLoading,
      icon: BookOpen,
      href: paths.dashboard.courses.getHref(),
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    },
    {
      title: "อาคาร",
      count: buildingsQuery.data?.meta?.totalItems ?? 0,
      loading: buildingsQuery.isLoading,
      icon: Library,
      href: paths.dashboard.buildings.getHref(),
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "ห้องเรียน",
      count: roomsQuery.data?.meta?.totalItems ?? 0,
      loading: roomsQuery.isLoading,
      icon: Library,
      href: paths.dashboard.rooms.getHref(),
      color: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    },
    {
      title: "โปรเจกต์วิจัย",
      count: projectsQuery.data?.meta?.totalItems ?? 0,
      loading: projectsQuery.isLoading,
      icon: Briefcase,
      href: paths.dashboard.projects.getHref(),
      color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardContentHeader
        title="แดชบอร์ด"
        description="ยินดีต้อนรับสู่ระบบจัดการเว็บไซต์ภาควิชาวิทยาการคอมพิวเตอร์ แม่โจ้ (CSMJU)"
      />

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-blue-700 p-6 text-white shadow-md border border-primary/20">
        <div className="absolute right-0 top-0 -mr-6 -mt-6 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute left-1/3 bottom-0 -mb-10 h-32 w-32 rounded-full bg-white/5 blur-xl" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
              <span>ภาพรวมระบบในขณะนี้</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
              สวัสดี! ยินดีต้อนรับกลับมา, {user.data?.name || "ผู้ดูแลระบบ"}
            </h1>
            <p className="text-sm text-white/80 max-w-xl">
              คุณกำลังเข้าสู่ระบบจัดการข้อมูลหลังบ้านของภาควิชาฯ คุณสามารถจัดการบทความ กิจกรรม คำร้องเรียน ข้อมูลหลักสูตร และอาคารสถานที่ได้จากแถบเมนูด้านซ้ายหรือทางลัดบนแดชบอร์ดนี้
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/10 self-start md:self-auto">
            <Clock className="h-5 w-5 text-white/80" />
            <div className="text-right md:text-left">
              <p className="text-xs text-white/60">เข้าสู่ระบบล่าสุดเมื่อ</p>
              <p className="text-xs font-semibold text-white">
                {new Date().toLocaleDateString("th-TH", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold tracking-tight">ภาพรวมข้อมูล</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.title} href={card.href} className="group">
                <Card className="h-full border bg-card text-card-foreground hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden relative">
                  {card.highlight && (
                    <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-rose-500 mr-3 mt-3 animate-ping" />
                  )}
                  <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${card.color} transition-colors`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      {card.highlight && (
                        <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
                          มีรายการใหม่
                        </Badge>
                      )}
                    </div>
                    <div>
                      {card.loading ? (
                        <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                      ) : (
                        <div className="text-3xl font-extrabold tracking-tight group-hover:text-primary transition-colors">
                          {card.count.toLocaleString("th-TH")}
                        </div>
                      )}
                      <p className="text-sm font-medium text-muted-foreground mt-1">
                        {card.title}ทั้งหมด
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Detail Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <Card className="border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-bold">คำร้องเรียนล่าสุด</CardTitle>
              <CardDescription>คำร้องเรียนและข้อเสนอแนะที่ส่งมาจากผู้ใช้</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={paths.dashboard.complains.getHref()} className="flex items-center gap-1">
                <span>จัดการทั้งหมด</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {complainsQuery.isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 w-full animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
            ) : complainsQuery.data?.data && complainsQuery.data.data.length > 0 ? (
              <div className="divide-y divide-border">
                {complainsQuery.data.data.slice(0, 5).map((complain) => (
                  <div key={complain.id} className="py-3 flex flex-col gap-1 first:pt-0 last:pb-0 hover:bg-accent/30 rounded-lg px-2 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-semibold text-sm text-foreground line-clamp-1">
                        {complain.title}
                      </h4>
                      <Badge variant="outline" className="text-[10px] shrink-0 bg-muted/50">
                        {formatSafeDate(complain.createdAt)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {complain.detail || "ไม่มีรายละเอียดเพิ่มเติม"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <Empty className="py-6">
                <EmptyHeader>
                  <EmptyTitle className="text-sm">ไม่มีข้อมูลคำร้องเรียน</EmptyTitle>
                  <EmptyDescription className="text-xs">
                    ขณะนี้ยังไม่มีคำร้องเรียนหรือข้อเสนอแนะเข้ามาในระบบ
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </CardContent>
        </Card>

        {/* Recent Articles */}
        <Card className="border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-bold">บทความและข่าวสารล่าสุด</CardTitle>
              <CardDescription>ข่าวสาร กิจกรรม และองค์ความรู้ที่เผยแพร่บนเว็บไซต์</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={paths.dashboard.articles.getHref()} className="flex items-center gap-1">
                <span>จัดการทั้งหมด</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {articlesQuery.isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 w-full animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
            ) : articlesQuery.data?.data && articlesQuery.data.data.length > 0 ? (
              <div className="divide-y divide-border">
                {articlesQuery.data.data.slice(0, 5).map((article) => (
                  <div key={article.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0 hover:bg-accent/30 rounded-lg px-2 transition-colors">
                    <div className="space-y-1 min-w-0">
                      <h4 className="font-semibold text-sm text-foreground truncate max-w-[280px] sm:max-w-md">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{article.category || "ข่าวสารทั่วไป"}</span>
                        <span>•</span>
                        <span>{formatSafeDate(article.createdAt)}</span>
                      </div>
                    </div>
                    <Badge variant={article.published ? "default" : "secondary"} className="text-[10px]">
                      {article.published ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <Empty className="py-6">
                <EmptyHeader>
                  <EmptyTitle className="text-sm">ไม่มีข้อมูลบทความ</EmptyTitle>
                  <EmptyDescription className="text-xs">
                    ยังไม่มีการเขียนบทความหรือข่าวประชาสัมพันธ์ในระบบ
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Panel */}
      <Card className="border bg-card text-card-foreground shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">ทางลัดการดำเนินการ</CardTitle>
          <CardDescription>เข้าถึงฟังก์ชันหลักเพื่อเพิ่มข้อมูลเข้าระบบได้อย่างรวดเร็ว</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border bg-card hover:bg-primary/5 hover:text-primary rounded-xl" asChild>
              <Link href={paths.dashboard.articles.getHref()}>
                <Plus className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold">เขียนบทความใหม่</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border bg-card hover:bg-primary/5 hover:text-primary rounded-xl" asChild>
              <Link href={paths.dashboard.events.getHref()}>
                <Plus className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-semibold">สร้างกิจกรรมใหม่</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border bg-card hover:bg-primary/5 hover:text-primary rounded-xl" asChild>
              <Link href={paths.dashboard.courses.getHref()}>
                <Plus className="h-5 w-5 text-cyan-500" />
                <span className="text-xs font-semibold">เพิ่มรายวิชาเรียน</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border bg-card hover:bg-primary/5 hover:text-primary rounded-xl" asChild>
              <Link href={paths.dashboard.personnel.getHref()}>
                <Plus className="h-5 w-5 text-purple-500" />
                <span className="text-xs font-semibold">เพิ่มบุคลากรใหม่</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
