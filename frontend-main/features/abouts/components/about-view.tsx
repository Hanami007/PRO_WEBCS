"use client";

import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { useAboutSections } from "../api/get-about-sections";
import AboutSection from "./about-section";

const AboutView = () => {
  const aboutSectionsQuery = useAboutSections({ sortBy: "sortOrder:ASC" });

  if (aboutSectionsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const sections = aboutSectionsQuery.data?.data;

  if (!sections) return null;

  return (
    <div>
      {sections.map((section) => (
        <div key={section.id} className="space-y-4">
          <AboutSection section={section} />
        </div>
      ))}
    </div>
  );
};

export default AboutView;
