"use client";

import React from "react";
import { useFeatures } from "../api/get-features";
import { FeatureBlockKeys, FeatureBlockStats } from "./feature-block";

export const FeatureView = () => {
  const featuresQuery = useFeatures({
    limit: 10,
    sortBy: "createdAt:ASC",
    "filter.isActive": "$eq:true",
  });

  const features = featuresQuery.data?.data;

  if (!features) return null;

  const stats = features.filter((feature) => feature.type === "stats");
  const keys = features.filter((feature) => feature.type === "keys");

  return (
    <div>
      <FeatureBlockKeys keys={keys} />
      <FeatureBlockStats stats={stats} />
    </div>
  );
};
