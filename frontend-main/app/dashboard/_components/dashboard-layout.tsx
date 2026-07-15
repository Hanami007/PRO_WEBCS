"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import { AppContent } from "./app-content";
import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: user, isPending } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!isPending) {
      if (!user || user.role?.name !== "admin") {
        router.push("/");
      }
    }
  }, [user, isPending, router]);

  if (isPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Spinner className="h-10 w-10 text-primary" />
      </div>
    );
  }

  if (!user || user.role?.name !== "admin") {
    return null;
  }

  return (
    <Layout>
      <SidebarProvider>
        <AppSidebar />
        <AppContent>{children}</AppContent>
      </SidebarProvider>
    </Layout>
  );
};
