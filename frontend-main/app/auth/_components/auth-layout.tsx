"use client";

import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};
