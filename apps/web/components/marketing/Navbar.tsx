// apps/web/components/marketing/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

type NavItem = { label: string; href: string };

export default function Navbar() {
  const items: NavItem[] = useMemo(
    () => [
      { label: "About Us", href: "#about" },
      { label: "Properties", href: "#properties" },
      { label: "Services", href: "#services" },
      { label: "Contact Us", href: "#contact" },
    ],
    []
  );

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;

    // Always show near top
    if (latest < 20) {
      setHidden(false);
      return;
    }

    // Hide on scroll down, show on scroll up
    if (latest > prev && latest > 80) setHidden(true);
    if (latest < prev) setHidden(false);
  });

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -88 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-[var(--border)] shadow-sm"
    >
      <div className="mx-auto max-w-6xl px-4 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="ProNest" width={120} height={28} priority />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="hover:text-[var(--fg)] transition-colors">
              {it.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/auth/login"
            className="h-10 px-4 rounded-full border border-[var(--border)] text-sm hover:bg-black/5 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="h-10 px-4 rounded-full bg-[var(--brand)] text-white text-sm hover:opacity-90 transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu */}
        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden h-10 w-10 grid place-items-center rounded-full border border-[var(--border)] hover:bg-black/5 transition"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>
      </div>
    </motion.header>
  );
}