import { ReactNode } from "react";
import { Metadata } from "next";
import { env } from "@/config/env";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/features/settings/components/sidebar-nav";
import { paths } from "@/config/paths";
import { UserCog, Wrench, Palette, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings",
  description: env.APP_DESCRIPTION,
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: paths.dashboard.settings.getHref(),
    icon: <UserCog size={18} />,
  },
  {
    title: "Account",
    href: paths.dashboard.settings.account.getHref(),
    icon: <Wrench size={18} />,
  },
  {
    title: "Appearance",
    href: paths.dashboard.settings.appearance.getHref(),
    icon: <Palette size={18} />,
  },
  {
    title: "Sessions",
    href: paths.dashboard.settings.sessions.getHref(),
    icon: <ShieldCheck size={18} />,
  },
];

const SettingsLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Settings"
        description="Manage your account settings and set e-mail preferences."
      ></DashboardContentHeader>
      <Separator />
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden p-1">{children}</div>
      </div>
    </DashboardContentLayout>
  );
};

export default SettingsLayout;

export const dynamic = "force-dynamic";
