"use client";

import React from "react";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import { DashboardContactList } from "@/features/contacts/components/dashboard/dashboard-contact-list";
import { CreateContact } from "@/features/contacts/components/dashboard/create-contact";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";

export const DashboardContacts = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Contacts Management"
        description="Manage your organization's contact details."
      >
        <CreateContact />
      </DashboardContentHeader>
      <Separator />
      <DashboardContactList />
    </DashboardContentLayout>
  );
};

export default DashboardContacts;
