"use client";

import React from "react";
import { useUser } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";

import { ContentSection } from "./content-section";
import UpdateUserInfoForm from "./update-user-info-form";
import UpdateUserPhotoForm from "./update-user-photo-form";

const SettingsView = () => {
  const { data: user } = useUser();

  return (
    <ContentSection
      title={"Profile"}
      desc={"Update your personal information."}
    >
      <div className="space-y-8">
        <UpdateUserInfoForm key={user?.name} />
        <Separator />
        <UpdateUserPhotoForm />
      </div>
    </ContentSection>
  );
};

export default SettingsView;
