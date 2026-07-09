import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProvider } from "./provider";
import { ReactNode } from "react";
import { env } from "@/config/env";
import { Noto_Sans_Thai } from "next/font/google";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-thai",
});

export const metadata: Metadata = {
  title: env.APP_NAME,
  description: env.APP_DESCRIPTION,
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={notoThai.variable} suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const dynamic = "force-dynamic";
