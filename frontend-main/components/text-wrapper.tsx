"use client";

import React, { ReactNode } from "react";

type TextWrapperProps = {
  title: string;
  children: ReactNode;
};

export const TextWrapper = ({ title, children }: TextWrapperProps) => {
  return (
    <div className="mx-auto min-w-[45ch] max-w-[78ch] py-4 space-y-6">
      <p className="lead">{title}</p>
      <div className="text-body">{children}</div>
    </div>
  );
};
