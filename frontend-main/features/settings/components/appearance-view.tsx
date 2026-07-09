"use client";

import React from "react";
import { ContentSection } from "./content-section";
import { AppearanceForm } from "./appearance-form";

const AppearanceView = () => {
  return (
    <ContentSection
      title={"Appearance"}
      desc={"Customize the look and feel of your dashboard."}
    >
      <AppearanceForm />
    </ContentSection>
  );
};

export default AppearanceView;
