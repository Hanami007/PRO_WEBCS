"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeaderMenu from "./header-menu";
import { ModeToggle } from "./mode-toggle";
import { env } from "@/config/env";
import HamburgerMenu from "./hamburger-menu";
import { LogoImage } from "@/components/logo";
import { paths } from "@/config/paths";
import { ArrowUpRight } from "lucide-react";

import { AnnouncementBannerList } from "@/features/announcements/components/announcement-banner-list";
import { useResourceByKey } from "@/features/resources/api/get-resource-by-key";
import { useUser, useLogout } from "@/lib/auth";

export const Header = () => {
  const { data: user } = useUser();
  const logout = useLogout({});
  const admissionQuery = useResourceByKey({ resourceKey: "admission_link" });
  const applyNow =
    admissionQuery.data?.value || "https://admissions.mju.ac.th/";

  return (
    <div className="sticky top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="relative z-20 pointer-events-auto">
        <AnnouncementBannerList />
      </div>
      <div className="relative z-10 pointer-events-auto bg-background border-b">
        <div className="mx-auto transition-all duration-300 bg-background/80 backdrop-blur-lg">
          <nav className="w-full mx-auto max-w-384">
            <div className="flex-between px-2">
              <div className="flex-start gap-8">
                <Link href="/" className="flex items-center">
                  <LogoImage className="h-16 w-16 transition-all duration-300" />
                  <span className="hidden font-bold text-2xl ml-3">
                    {env.APP_NAME}
                  </span>
                </Link>

                <div className="hidden lg:flex gap-4">
                  <HeaderMenu />
                  <ModeToggle />
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-4">
                {user ? (
                  <>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      สวัสดี, {user.name}
                    </span>
                    {user.role?.name === "admin" && (
                      <Button asChild variant="outline" className="cursor-pointer">
                        <Link href={paths.dashboard.root.getHref()}>จัดการระบบ</Link>
                      </Button>
                    )}
                    <Button onClick={() => logout.mutate()} variant="destructive" className="cursor-pointer">
                      ออกจากระบบ
                    </Button>
                  </>
                ) : (
                  <Button asChild variant="secondary" className="cursor-pointer">
                    <Link href={paths.auth.login.getHref()}>เข้าสู่ระบบ</Link>
                  </Button>
                )}
                <Button asChild className="cursor-pointer">
                  <Link href={applyNow}>
                    <span>สมัครเรียน</span>
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="lg:hidden flex justify-end">
                <HamburgerMenu />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
