"use client";

import PropertyPageTopNav from "@/components/listings/PropertyPageTopNav";
import HomeownerSidebar from "@/components/dashboard/HomeownerSidebar";

type Props = {
  children: React.ReactNode;
  active?: "applications" | "listings" | "residents" | "settings";
};

export default function HomeownerDashboardShell({
  children,
  active = "applications",
}: Props) {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
      <PropertyPageTopNav isAuthenticated />

      <div className="flex">
        <HomeownerSidebar active={active} />

        <main className="flex-1 px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}