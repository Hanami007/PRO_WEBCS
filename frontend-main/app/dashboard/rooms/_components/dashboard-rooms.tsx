"use client";

import React from "react";
import { DashboardRoomList } from "@/features/rooms/components/dashboard/dashboard-room-list";
import { CreateRoom } from "@/features/rooms/components/dashboard/create-room";
import { DashboardContentLayout } from "@/components/layouts/dashboard-content-layout";
import DashboardContentHeader from "@/components/dashboard-content-header";
import { Separator } from "@/components/ui/separator";

export const DashboardRooms = () => {
  return (
    <DashboardContentLayout>
      <DashboardContentHeader
        title="Rooms Management"
        description="Manage campus rooms and their facilities."
      >
        <CreateRoom />
      </DashboardContentHeader>
      <Separator />
      <DashboardRoomList />
    </DashboardContentLayout>
  );
};

export default DashboardRooms;
