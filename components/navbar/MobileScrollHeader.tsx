// components/navbar/MobileScrollHeader.tsx
"use client";

import Link from "next/link";
import AppContainer from "@/components/shared/AppContainer";
import SearchBar from "@/components/shared/SearchBar";
import { isAuthEnabled } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

type MobileScrollHeaderProps = {
  visible: boolean;
};

export default function MobileScrollHeader({
  visible,
}: MobileScrollHeaderProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-40 w-full transition-all duration-300 lg:hidden",
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      <div className="border-b border-black/5 bg-[var(--bg)]/95 py-3 backdrop-blur-md">
        <AppContainer>
          <div className="pointer-events-auto flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <SearchBar compact />
            </div>

            {isAuthEnabled ? (
              <Link
                href="/login"
                className="shrink-0 text-[15px] font-medium text-[var(--brand)]"
              >
                Login
              </Link>
            ) : (
              <button
                type="button"
                className="shrink-0 text-[15px] font-medium text-[var(--brand)]"
              >
                Login
              </button>
            )}
          </div>
        </AppContainer>
      </div>
    </div>
  );
}
