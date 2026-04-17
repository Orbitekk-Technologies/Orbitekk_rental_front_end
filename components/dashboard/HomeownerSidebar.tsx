"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Props = {
  active?: "applications" | "listings" | "residents" | "settings";
};

const items = [
  { key: "applications", label: "Applications", href: "/dashboard/applications" },
  { key: "listings", label: "My Listings", href: "/dashboard/my-listings" },
  { key: "residents", label: "Residents", href: "/dashboard/residents" },
  { key: "settings", label: "Settings", href: "/dashboard/settings" },
];

export default function HomeownerSidebar({ active }: Props) {
  return (
    <aside className="w-[220px] border-r border-[var(--border)] px-6 py-6">
      <nav className="flex flex-col gap-5">
        {items.map((item) => {
          const isActive = active === item.key;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-[14px] font-medium",
                isActive
                  ? "text-[var(--brand)]"
                  : "text-[var(--fg)] hover:text-[var(--brand)]"
              )}
            >
              <span className="text-[16px]">•</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}