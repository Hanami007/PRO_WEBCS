"use client";

import { Monitor, Smartphone, Globe, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSessions } from "../api/get-sessions";
import { useLogoutOthers } from "../api/logout-others";

const getDeviceIcon = (userAgent: string) => {
  const ua = userAgent.toLowerCase();
  if (ua.includes("mobi") || ua.includes("android") || ua.includes("iphone")) {
    return <Smartphone className="h-5 w-5" />;
  }
  if (
    ua.includes("mozilla") ||
    ua.includes("chrome") ||
    ua.includes("safari")
  ) {
    return <Monitor className="h-5 w-5" />;
  }
  return <Globe className="h-5 w-5" />;
};

export const SessionList = () => {
  const sessionsQuery = useSessions();
  const logoutOthersMutation = useLogoutOthers({
    mutationConfig: {
      onSuccess: () => {
        toast.success("All other sessions have been revoked.");
      },
      onError: () => {
        toast.error("Failed to revoke other sessions.");
      },
    },
  });

  const sessions = sessionsQuery.data || [];

  if (sessionsQuery.isLoading) {
    return (
      <div className="p-4 italic text-muted-foreground">
        Loading sessions...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-sm font-medium">Active Sessions</h4>
          <p className="text-sm text-muted-foreground">
            Devices currently logged into your account.
          </p>
        </div>
        {sessions.length > 1 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => logoutOthersMutation.mutate(undefined)}
            disabled={logoutOthersMutation.isPending}
          >
            <ShieldAlert className="mr-2 h-4 w-4" />
            Logout from other devices
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {sessions.map((session) => (
          <Card
            key={session.id}
            className={session.isCurrent ? "border-primary" : ""}
          >
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                {getDeviceIcon(session.userAgent)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium">
                    {session.ip}
                  </CardTitle>
                  {session.isCurrent && (
                    <Badge variant="secondary" className="text-[10px] h-4">
                      Current Session
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-xs line-clamp-1">
                  {session.userAgent}
                </CardDescription>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>Created</p>
                <p>{new Date(session.createdAt).toLocaleString()}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
