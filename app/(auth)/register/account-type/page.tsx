// app/(auth)/register/account-type/page.tsx

import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { isAuthEnabled } from "@/lib/constants/navigation";

export default function AccountTypePage() {
  if (!isAuthEnabled) {
    redirect("/");
  }

  return <AuthShell mode="account-type" />;
}