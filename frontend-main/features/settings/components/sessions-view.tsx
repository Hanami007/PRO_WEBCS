"use client";

import React from "react";
import { ContentSection } from "./content-section";
import { SessionList } from "./session-list";

const SessionsView = () => {
  return (
    <ContentSection
      title={"Sessions"}
      desc={"Manage your active sessions and devices."}
    >
      <SessionList />
    </ContentSection>
  );
};

export default SessionsView;
