"use client";

import { paths } from "@/config/paths";
import LoginForm from "@/features/auth/components/login-form";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          onSuccess={() =>
            router.replace(
              `${
                redirectTo
                  ? `${decodeURIComponent(redirectTo)}`
                  : paths.dashboard.dashboard.getHref()
              }`
            )
          }
        />
      </div>
    </div>
  );
};

export default LoginPage;
