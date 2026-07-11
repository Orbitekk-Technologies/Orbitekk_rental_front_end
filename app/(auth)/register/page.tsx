import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { isAuthEnabled } from "@/lib/constants/navigation";

export default function RegisterPage() {
  if (!isAuthEnabled) {
    redirect("/");
  }

  return <AuthShell mode="register" />;
}