"use client";

import Link from "next/link";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AppContainer from "@/components/shared/AppContainer";
import BrandLogo from "@/components/shared/BrandLogo";
import { isAuthEnabled, marketingNavItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";
import { usePathname } from "next/navigation";

type PropertyPageTopNavProps = {
  isAuthenticated?: boolean;
  userName?: string;
};

export default function PropertyPageTopNav({
  isAuthenticated = false,
  userName = "TestUser",
}: PropertyPageTopNavProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-black/5 bg-[var(--bg)]">
      <AppContainer>
        <div className="flex h-[82px] items-center justify-between gap-6">
          <BrandLogo variant="full" priority />

          <nav className="hidden items-center gap-10 lg:flex">
            {marketingNavItems.map((item) => {
              const active = pathname === item.href;

              if (item.disabled) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="text-[14px] font-medium text-[var(--fg)] transition-colors hover:text-[var(--brand)]"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-[14px] font-medium transition-colors hover:text-[var(--brand)]",
                    active ? "text-[var(--brand)]" : "text-[var(--fg)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--fg)] transition-colors hover:bg-white"
              >
                <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 20 }} />
              </button>

              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--fg)] transition-colors hover:bg-white"
              >
                <NotificationsNoneRoundedIcon sx={{ fontSize: 20 }} />
              </button>

              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-sm font-medium text-[var(--muted)]">
                  {userName.charAt(0).toUpperCase()}
                </span>
                <span className="text-[14px] font-medium text-[var(--fg)]">
                  {userName}
                </span>
              </div>
            </div>
          ) : isAuthEnabled ? (
            <Link
              href="/login"
              className="text-[14px] font-medium text-[var(--brand)] transition-colors hover:text-[var(--brand-strong)]"
            >
              Login
            </Link>
          ) : (
            <button
              type="button"
              className="text-[14px] font-medium text-[var(--brand)] transition-colors hover:text-[var(--brand-strong)]"
            >
              Login
            </button>
          )}
        </div>
      </AppContainer>
    </header>
  );
}
