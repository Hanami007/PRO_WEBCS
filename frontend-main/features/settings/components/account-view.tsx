"use client";

import React from "react";
import ChangePasswordForm from "@/features/auth/components/change-password-form";
import { ContentSection } from "./content-section";

const AccountView = () => {
  return (
    <ContentSection
      title={"Account"}
      desc={
        "Update your account settings. Set your preferred language and timezone."
      }
    >
      <ChangePasswordForm
        onSuccess={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </ContentSection>
  );
};

export default AccountView;
