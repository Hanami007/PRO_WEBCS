"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import { AppContent } from "./app-content";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Layout>
      <SidebarProvider>
        <AppSidebar />
        <AppContent>{children}</AppContent>
      </SidebarProvider>
    </Layout>
  );
};
