"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/features/sidebar/components/nav-main";
import { NavUser } from "@/features/sidebar/components/nav-user";
import { paths } from "@/config/paths";
import Link from "next/link";
import { NavShortcut } from "@/features/sidebar/components/nav-shortcut";
import { useUser } from "@/lib/auth";
import { navData } from "@/config/dashboard-nav";
import { LogoImage } from "@/components/logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5] h-24"
            >
              <Link href={paths.dashboard.root.getHref()}>
                <LogoImage className="h-24 w-32" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavShortcut items={navData.navShortcut} />
        <NavMain items={navData.navMain} label="Website" />
        <NavMain items={navData.navDepartment} label="Department" />
        <NavMain items={navData.navOther} label="Other" />
      </SidebarContent>
      <SidebarFooter>
        {user.data && <NavUser user={user.data} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
