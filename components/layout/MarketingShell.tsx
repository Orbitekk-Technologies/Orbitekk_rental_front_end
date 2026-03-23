// components/layout/MarketingShell.tsx
"use client";

import { useEffect, useState } from "react";
import DesktopNavbar from "@/components/navbar/DesktopNavbar";
import MobileNavbar from "@/components/navbar/MobileNavbar";
import MobileScrollHeader from "@/components/navbar/MobileScrollHeader";
import Footer from "@/components/footer/Footer";

type MarketingShellProps = {
  children: React.ReactNode;
};

export default function MarketingShell({ children }: MarketingShellProps) {
  const [showMobileScrollHeader, setShowMobileScrollHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileScrollHeader(window.scrollY > 72);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)] lg:flex lg:min-h-dvh lg:flex-col">
      <MobileScrollHeader visible={showMobileScrollHeader} />
      <DesktopNavbar />
      <MobileNavbar hidden={showMobileScrollHeader} />

      <main className="lg:flex-1">{children}</main>

      <Footer />
    </div>
  );
}