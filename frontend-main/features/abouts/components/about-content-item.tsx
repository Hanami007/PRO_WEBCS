"use client";

import React from "react";
import { AboutContent, aboutContentLayoutEnum } from "../types/api";
import Image from "next/image";

type AboutContentItemProps = {
  content: AboutContent;
};

const AboutContentItem = ({ content }: AboutContentItemProps) => {
  const { layoutType, image, title, body } = content;

  if (layoutType === aboutContentLayoutEnum.TEXT) {
    return (
      <div className="mx-auto min-w-[45ch] max-w-[78ch] py-4 space-y-6">
        {title && <p className="lead font-bold text-xl">{title}</p>}
        <div className="text-body whitespace-pre-wrap">
          <span>{body}</span>
        </div>
      </div>
    );
  }

  if (layoutType === aboutContentLayoutEnum.IMAGE) {
    return (
      <div className="space-y-4">
        {title && <p className="lead font-bold text-xl text-center">{title}</p>}
        <div className="relative h-320 max-h-[640px] w-full">
          <Image
            src={image?.url || "/cs-logo.svg"}
            fill={true}
            alt={title || "About content image"}
            className="rounded-md object-contain"
          />
        </div>
      </div>
    );
  }

  return null;
};

export default AboutContentItem;
