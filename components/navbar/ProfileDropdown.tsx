"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type ProfileDropdownProps = {
  userName?: string;
  accountType?: "tenant" | "homeowner";
};

export default function ProfileDropdown({
  userName = "TestUser",
  accountType = "homeowner",
}: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-sm font-medium text-[var(--muted)]">
          {userName.charAt(0).toUpperCase()}
        </span>

        <span className="text-[14px] font-medium text-[var(--fg)]">
          {userName}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[110%] w-[220px] rounded-[14px] border border-[var(--border)] bg-white shadow-lg">
          <div className="flex flex-col py-2 text-[14px]">
            <Link
              href="/profile"
              className="px-4 py-2 hover:bg-gray-50"
            >
              Profile Settings
            </Link>

            {accountType === "homeowner" && (
              <Link
                href="/dashboard/applications"
                className="px-4 py-2 text-[var(--brand)] hover:bg-gray-50"
              >
                Go To Dashboard
              </Link>
            )}

            <Link
              href="/favourites"
              className="px-4 py-2 hover:bg-gray-50"
            >
              Favourites
            </Link>

            <div className="my-1 h-px bg-[var(--border)]" />

            <button className="px-4 py-2 text-left text-red-500 hover:bg-gray-50">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}