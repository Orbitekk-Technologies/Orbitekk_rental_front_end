"use client";

import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/AppSidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { FRONTEND_DEMO_MODE } from "@/lib/demoData";
import React from "react";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const demoRole = pathname.startsWith("/tenants") ? "tenant" : "manager";

  // TODO(spring-auth): When FRONTEND_DEMO_MODE is disabled, restore the
  // authenticated-user query, unauthenticated redirect, and role-based guard
  // here using the Spring Boot JWT response from GET /auth/me.
  if (!FRONTEND_DEMO_MODE) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-primary-100">
        <Navbar />
        <div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex">
            <Sidebar userType={demoRole} />
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
