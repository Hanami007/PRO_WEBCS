"use client";

import React from "react";
import { usePersonnels } from "../api/get-personnels";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/config/paths";

const PersonnelList = () => {
  const personnelQuery = usePersonnels({
    page: 1,
    limit: 100,
    sortBy: "fullnameTh:ASC",
    "filter.workStatus.name": "$eq:ทำงานปกติ",
  });

  const personnels = personnelQuery.data?.data;

  if (!personnels) return null;

  const professors = personnels.filter(
    (personnel) => personnel.personnelType === "อาจารย์",
  );

  const staffs = personnels.filter(
    (personnel) => personnel.personnelType === "เจ้าหน้าที่",
  );

  return (
    <section className="">
      <div className="mx-auto px-8 lg:px-0">
        <div className="">
          <h3 className="mb-6 text-lg font-medium text-center">คณาจารย์</h3>
          <div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4 justify-items-center items-center">
            {professors.map((professor, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-background size-32 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                  <Link href={paths.department.personnel.getHref(professor.id)}>
                    <Image
                      className="aspect-square rounded-full object-cover hover:bg-primary/80 transition-colors"
                      src={professor.profileImage?.url || "/logo.png"}
                      alt={professor.fullnameEn || "Professor"}
                      height={460}
                      width={460}
                    />
                  </Link>
                </div>
                <span className="mt-2 block text-sm">
                  {professor.prefix}
                  {professor.fullnameTh}
                </span>
                <span className="text-muted-foreground block text-xs">
                  {professor.academicPosition}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-6 text-lg font-medium text-center">เจ้าหน้าที่</h3>
          <div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4 justify-items-center items-center">
            {staffs.map((staff, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-background size-32 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                  <Link href={paths.department.personnel.getHref(staff.id)}>
                    <Image
                      className="aspect-square rounded-full object-cover hover:bg-primary/80 transition-colors"
                      src={staff.profileImage?.url || "/logo.png"}
                      alt={staff.fullnameEn || "Staff"}
                      height={460}
                      width={460}
                    />
                  </Link>
                </div>
                <span className="mt-2 block text-sm">{staff.fullnameTh}</span>
                <span className="text-muted-foreground block text-xs">
                  {staff.academicPosition}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonnelList;
