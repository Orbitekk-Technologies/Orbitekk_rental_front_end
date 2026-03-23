// components/navbar/MobileDrawer.tsx
"use client";

import Link from "next/link";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AnimatePresence, motion } from "framer-motion";
import BrandLogo from "@/components/shared/BrandLogo";
import { marketingNavItems } from "@/lib/constants/navigation";
import { contactConfig } from "@/lib/constants/contact";
import { siteConfig } from "@/lib/constants/site";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileDrawer({
  open,
  onClose,
}: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed left-0 top-0 z-50 flex h-dvh w-[74%] max-w-[340px] flex-col bg-white px-6 pb-6 pt-6 lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="mb-10 flex items-start justify-between">
              <BrandLogo variant="badge" />

              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--fg)]"
              >
                <CloseRoundedIcon sx={{ fontSize: 32 }} />
              </button>
            </div>

            <div className="space-y-10">
              <div>
                <p className="mb-5 text-[15px] font-semibold text-[var(--fg)]">
                  Menu
                </p>

                <nav className="flex flex-col gap-6">
                  {marketingNavItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="text-[17px] font-medium text-[var(--fg)] transition-colors hover:text-[var(--brand)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <p className="mb-5 text-[15px] font-semibold text-[var(--fg)]">
                  Get in Touch
                </p>

                <div className="flex flex-col gap-5">
                  {siteConfig.socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-[17px] font-medium text-[var(--fg)] transition-colors hover:text-[var(--brand)]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-5 text-[15px] font-semibold text-[var(--fg)]">
                  Address
                </p>

                <div className="space-y-1 text-[17px] leading-8 text-[var(--fg)]">
                  <p>{contactConfig.addressLine1}</p>
                  <p>{contactConfig.addressLine2}</p>
                  <p>
                    {contactConfig.city}, {contactConfig.state}, USA
                  </p>
                  <p>{contactConfig.zipCode}</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-10">
              <div className="mb-5 flex flex-col gap-3 text-[15px] text-[var(--muted)]">
                {siteConfig.footerLinks.map((item) => (
                  <a key={item.label} href={item.href}>
                    {item.label === "T&C" ? "Term & Conditions" : item.label}
                  </a>
                ))}
              </div>

              <p className="text-[15px] text-[var(--muted)]">
                © 2026 {siteConfig.name}
              </p>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}