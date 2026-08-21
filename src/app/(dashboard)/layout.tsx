"use client";

import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/AppSidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React from "react";
import { useGetAuthUserQuery } from "@/state/api";
import { useAuth } from "@/app/(auth)/authProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isAuthReady, signOut } = useAuth();
  const { data: authUser, isLoading, isError } = useGetAuthUserQuery(undefined, {
    skip: !isAuthReady || !user,
  });
  useEffect(() => {
    if (isAuthReady && !user) router.replace("/signin");
    if (isError) {
      signOut();
      router.replace("/signin");
    }
  }, [isAuthReady, isError, router, signOut, user]);

  if (!isAuthReady || !user || isLoading || !authUser) {
    return <>Loading...</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-primary-100">
        <Navbar />
        <div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex">
            <Sidebar userType="user" />
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
