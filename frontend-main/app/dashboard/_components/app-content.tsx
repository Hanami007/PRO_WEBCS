"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { paths } from "@/config/paths";
import { MainErrorFallback } from "@/components/errors/main";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Filter out the initial "dashboard" segment as it's handled by the "Home" link
  const breadcrumbSegments = segments[0] === "dashboard" ? segments.slice(1) : segments;

  const breadcrumbs = breadcrumbSegments.map((segment, index) => {
    // Generate the path by joining all segments up to the current one
    // We add "dashboard" back to the front of the sliced segments if it was there
    const prefix = segments[0] === "dashboard" ? ["dashboard"] : [];
    const pathSegments = [...prefix, ...breadcrumbSegments.slice(0, index + 1)];
    const path = `/${pathSegments.join("/")}`;

    // Format display name: capitalize and replace hyphens with spaces
    const display = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { segment, path, display };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={paths.dashboard.root.getHref()}>หน้าหลัก</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.length > 0 && <BreadcrumbSeparator />}
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={crumb.path}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb.display}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.path}>{crumb.display}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumbs />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
    </SidebarInset>
  );
};

export const AppContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <Layout>
      <ErrorBoundary key={pathname} FallbackComponent={MainErrorFallback}>
        {children}
      </ErrorBoundary>
    </Layout>
  );
};
