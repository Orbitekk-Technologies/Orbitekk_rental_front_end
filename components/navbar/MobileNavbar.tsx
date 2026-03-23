// components/navbar/MobileNavbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AppContainer from "@/components/shared/AppContainer";
import MobileDrawer from "@/components/navbar/MobileDrawer";
import BrandLogo from "@/components/shared/BrandLogo";

type MobileNavbarProps = {
  hidden?: boolean;
};

export default function MobileNavbar({ hidden = false }: MobileNavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={`lg:hidden ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <AppContainer>
          <div className="relative flex h-[78px] items-center justify-between">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--fg)]"
            >
              <MenuRoundedIcon sx={{ fontSize: 32 }} />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2">
              <BrandLogo variant="badge" priority />
            </div>

            <Link
              href="/login"
              className="text-[15px] font-medium text-[var(--brand)] transition-colors hover:text-[var(--brand-strong)]"
            >
              Login
            </Link>
          </div>
        </AppContainer>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}