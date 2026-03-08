//components/marketing/navigation/Navbar.tsx
"use client";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About Us", href: "#about" },
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "Contact Us", href: "#footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-10">
          <div className="flex w-full items-center justify-between md:hidden">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--fg)]"
            >
              <MenuRoundedIcon fontSize="medium" />
            </button>

            <Link
              href="/"
              className="text-[30px] font-semibold tracking-[-0.03em] text-[var(--brand)]"
            >
              ProNest
            </Link>

            <Link
              href="/login"
              className="text-sm font-medium text-[var(--brand)]"
            >
              Login
            </Link>
          </div>

          <div className="hidden w-full items-center justify-between md:flex">
            <Link
              href="/"
              className="text-[20px] font-semibold tracking-[-0.03em] text-[var(--brand)]"
            >
              ProNest
            </Link>

            <nav className="flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-[var(--fg)] transition hover:text-[var(--brand)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--brand)] px-6 text-sm font-medium text-[var(--brand)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--brand)] px-6 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[var(--brand-strong)] hover:shadow-[var(--shadow-card)]"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 z-50 flex h-screen w-[82%] max-w-[320px] flex-col bg-white px-5 pb-8 pt-6 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Link
                  href="/"
                  className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--brand)]"
                >
                  ProNest
                </Link>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                >
                  <CloseRoundedIcon fontSize="medium" />
                </button>
              </div>

              <div className="space-y-7">
                <div>
                  <p className="mb-4 text-sm font-semibold text-[var(--fg)]">
                    Menu
                  </p>
                  <div className="space-y-4">
                    {[
                      "Services",
                      "Properties",
                      "Locations",
                      "FAQ's",
                      "Contact Us",
                    ].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block text-[15px] text-[var(--fg)]"
                        onClick={() => setOpen(false)}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-sm font-semibold text-[var(--fg)]">
                    Get in Touch
                  </p>
                  <div className="space-y-4">
                    {["Contact Us", "Instagram", "Facebook"].map((item) => (
                      <a key={item} href="#" className="block text-[15px] text-[var(--fg)]">
                        {item}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-sm font-semibold text-[var(--fg)]">
                    Address
                  </p>
                  <p className="max-w-[180px] text-[14px] leading-7 text-[var(--muted)]">
                    1328 Underwood Street, Apt 106, Denton, TX, USA 76201
                  </p>
                </div>
              </div>

              <div className="mt-auto space-y-4 pt-8">
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--brand)] px-6 text-sm font-medium text-[var(--brand)]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--brand)] px-6 text-sm font-medium text-white"
                  >
                    Register
                  </Link>
                </div>

                <div className="space-y-2 text-sm text-[var(--muted-2)]">
                  <p>Privacy Policy</p>
                  <p>Term & Conditions</p>
                  <p>Copyright 2026 @Propowners</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}