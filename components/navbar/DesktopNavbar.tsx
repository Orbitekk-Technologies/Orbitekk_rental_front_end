"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AppContainer from "@/components/shared/AppContainer";
import PrimaryButton from "@/components/shared/PrimaryButton";
import BrandLogo from "@/components/shared/BrandLogo";
import { marketingNavItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

export default function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <header className="hidden lg:block">
      <AppContainer>
        <div className="flex h-[88px] items-center justify-between">
          <BrandLogo variant="full" priority />

          <nav className="flex items-center gap-10">
            {marketingNavItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-[var(--brand)]",
                    active ? "text-[var(--brand)]" : "text-[var(--fg)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className={cn(
                "text-base font-medium transition-colors hover:text-[var(--brand-strong)]",
                pathname === "/login" ? "text-[var(--brand)]" : "text-[var(--fg)]"
              )}
            >
              Login
            </Link>

            <Link href="/register">
              <PrimaryButton className="h-12 min-w-[132px] px-7">
                Signup
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </AppContainer>
    </header>
  );
}
