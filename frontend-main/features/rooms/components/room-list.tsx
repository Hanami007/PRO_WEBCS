"use client";

import React from "react";
import { useRooms } from "../api/get-rooms";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Layers, Monitor, Users } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export const RoomList = () => {
  const roomQuery = useRooms({ limit: 100 });

  if (roomQuery.isLoading) return <Spinner />;

  const rooms = roomQuery.data?.data;

  if (!rooms) return null;

  const labs = rooms.filter(
    (room) => room.type?.name === "ห้องปฏิบัติการ",
  );

  const lectures = rooms.filter(
    (room) => room.type?.name === "ห้องบรรยาย",
  );

  return (
    <section className=" py-16 md:py-32  space-y-8 lg:space-y-16">
      <h2 className="mb-8 text-2xl font-bold md:mb-16 lg:text-3xl">
        ห้องปฏิบัติการคอมพิวเตอร์
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {labs.map((room) => {
          return (
            <div
              key={room.id}
              className=" rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border"
            >
              <div className="h-48 bg-secondary relative">
                {room.image?.url ? (
                  <Image
                    src={room.image.url}
                    alt={room.nameTh}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Monitor className="h-12 w-12 opacity-20" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                    {room.code}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                    {room.nameTh}
                  </p>
                  {room.nameEn && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {room.nameEn}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 text-[10px] h-5"
                  >
                    <Layers className="h-3 w-3" />
                    {room.floor ? `Fl. ${room.floor}` : "Unknown"}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-[10px] h-5"
                  >
                    <Users className="h-3 w-3" />
                    {room.capacity} seats
                  </Badge>

                  {room.type && (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-[10px] h-5">
                      {room.type.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Separator />
      <h2 className="mb-8 text-2xl font-bold md:mb-16 lg:text-3xl">
        ห้องบรรยายคอมพิวเตอร์
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lectures.map((room) => {
          return (
            <div
              key={room.id}
              className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border"
            >
              <div className="h-48 bg-secondary relative">
                {room.image?.url ? (
                  <Image
                    src={room.image.url}
                    alt={room.nameTh}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Monitor className="h-12 w-12 opacity-20" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg  line-clamp-1">
                    {room.code}
                  </h3>
                  <p className="text-sm  line-clamp-1">{room.nameTh}</p>
                  {room.nameEn && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {room.nameEn}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 text-[10px] h-5"
                  >
                    <Layers className="h-3 w-3" />
                    {room.floor ? `Fl. ${room.floor}` : "Unknown"}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-[10px] h-5"
                  >
                    <Users className="h-3 w-3" />
                    {room.capacity} seats
                  </Badge>

                  {room.type && (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-[10px] h-5">
                      {room.type.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
