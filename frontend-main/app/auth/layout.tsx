import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AuthLayout as AuthLayoutComponent } from "./_components/auth-layout";
import { MainErrorFallback } from "@/components/errors/main";

export const metadata = {
  title: "Authentication",
  description: "CSMJU Authentication System",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full items-center justify-center">
          <p className="text-xl text-foreground">Loading...</p>
        </div>
      }
    >
      <ErrorBoundary fallback={<MainErrorFallback />}>
        <AuthLayoutComponent>{children}</AuthLayoutComponent>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AuthLayout;
