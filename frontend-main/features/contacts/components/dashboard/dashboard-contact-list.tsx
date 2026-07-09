"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useContacts } from "../../api/get-contacts";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/ui/data-table";
import { contactColumns } from "./dashboard-contacts-columns";

export const DashboardContactList = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;
  const limit = Number(searchParams?.get("limit")) || 10;
  const search = searchParams?.get("search") || "";

  const contactsQuery = useContacts({
    page: page,
    limit: limit,
    search: search,
  });

  if (contactsQuery.isPending && !contactsQuery.data) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const contacts = contactsQuery?.data?.data || [];
  const meta = contactsQuery?.data?.meta;
  const pageCount = meta?.totalPages || 0;

  return (
    <div className="space-y-8">
      <DataTable
        columns={contactColumns}
        data={contacts}
        pageCount={pageCount}
        searchPlaceholder="ค้นหาช่องทางติดต่อ..."
      />
      <span className="text-muted-foreground text-sm">
        Note: Do not delete contact if unnesscessary.
      </span>
    </div>
  );
};
