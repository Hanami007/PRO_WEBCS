"use client";

import React from "react";
import { useAlumnis } from "../api/get-alumnis";
import Image from "next/image";

const AlumniList = () => {
  const alumnisQuery = useAlumnis();

  if (alumnisQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const alumnis = alumnisQuery.data?.data;

  if (!alumnis) return null;

  return (
    <section className="">
      <div className="mx-auto max-w-5xl px-6">
        <div className="">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {alumnis.map((alumni, index) => (
              <div key={index} className="group overflow-hidden">
                <Image
                  className="h-96 w-full rounded-md object-cover object-top transition-all duration-500 group-hover:h-[22.5rem] group-hover:rounded-xl"
                  src={alumni.profileImage?.url || "logo.png"}
                  alt="member"
                  height={1239}
                  width={826}
                />
                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                      {alumni.fullName}
                    </h3>
                    <span className="text-xs">รุ่นที่ {alumni.cohort}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {alumni.position}
                    </span>
                    <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {alumni.workplace}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlumniList;
