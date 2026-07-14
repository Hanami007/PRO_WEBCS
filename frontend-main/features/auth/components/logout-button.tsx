"use client";

import { paths } from "@/config/paths";
import { useLogout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export const LogoutButton: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const router = useRouter();

  const { mutate: logout, isPending } = useLogout({
    onSuccess: () => {
      onSuccess?.();
      router.push(paths.auth.login.getHref());
    },
  });

  return (
    <button
      onClick={() => logout()}
      disabled={isPending}
      className="logout-btn"
    >
      {isPending ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
    </button>
  );
};
