"use client";

import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

const serviceCards = [
  {
    title: "Property Listings",
    description:
      "Easily browse and manage your property listings with our user-friendly platform.",
    icon: ApartmentRoundedIcon,
    wide: true,
  },
  {
    title: "Financial Reporting",
    description:
      "Generate detailed financial statements and performance reports to stay on top of property health.",
    icon: ReceiptLongRoundedIcon,
  },
  {
    title: "Service Requests",
    description:
      "Efficiently handle maintenance requests and work orders through one clean workflow.",
    icon: BuildCircleRoundedIcon,
  },
  {
    title: "Tenant Management",
    description:
      "Keep track of tenant information and lease agreements without hassle.",
    icon: Groups2RoundedIcon,
    wide: true,
  },
];

export default function AboutServices() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section className="rounded-[28px] bg-white/35 p-4 shadow-[var(--shadow-card)] sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[380px] text-center">
        <h2 className="text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--fg)] sm:text-[40px] lg:text-[46px]">
          Pronest Management Services
        </h2>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3 lg:mt-6 lg:gap-4">
        {serviceCards.map((card) => {
          const Icon = card.icon;
          const content = (
            <div
              className={cn(
                "h-full rounded-[24px] bg-white p-5 shadow-[var(--shadow-card)]",
                card.wide && "md:col-span-2"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-[var(--fg)] lg:text-2xl">
                  {card.title}
                </h3>
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
                  <Icon fontSize="small" />
                </span>
              </div>
              <p className="mt-8 max-w-[36ch] text-sm leading-6 text-[var(--muted)] lg:text-[15px]">
                {card.description}
              </p>
            </div>
          );

          if (!isDesktop) {
            return <div key={card.title}>{content}</div>;
          }

          return (
            <motion.div
              key={card.title}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className={cn(card.wide && "md:col-span-2")}
            >
              {content}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
