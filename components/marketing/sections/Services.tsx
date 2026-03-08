// components/marketing/sections/Services.ts

"use client";

import clsx from "clsx";
import RealEstateAgentRoundedIcon from "@mui/icons-material/RealEstateAgentRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import Reveal from "@/components/marketing/shared/Reveal";
import { services } from "@/data/services";

function getServiceIcon(icon: string) {
  switch (icon) {
    case "real_estate_agent":
      return <RealEstateAgentRoundedIcon fontSize="small" />;
    case "payments":
      return <PaymentsRoundedIcon fontSize="small" />;
    case "handyman":
      return <HandymanRoundedIcon fontSize="small" />;
    case "groups":
      return <GroupsRoundedIcon fontSize="small" />;
    default:
      return null;
  }
}

export default function Services() {
  return (
    <section id="services" className="pb-14 pt-8 md:pb-24 md:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="rounded-[32px] bg-[var(--surface-soft)] px-4 py-8 sm:px-6 md:px-10 md:py-12 lg:px-20 lg:py-14">
          <Reveal>
            <h2 className="text-center text-[34px] font-semibold tracking-[-0.03em] text-[var(--fg)] md:text-[48px]">
              Services We Do
            </h2>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-12 md:gap-5">
            {services.map((service, index) => {
              const wide = service.variant === "wide";

              return (
                <Reveal
                  key={service.title}
                  delay={index * 0.06}
                  className={clsx(
                    "rounded-[24px] bg-white p-5 shadow-[var(--shadow-card)] transition duration-300 md:hover:-translate-y-2 md:hover:shadow-[0_18px_40px_rgba(17,24,39,0.10)]",
                    wide ? "md:col-span-7" : "md:col-span-5"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="max-w-[220px] text-[24px] font-medium leading-[1.15] tracking-[-0.03em] text-[var(--fg)] md:text-[30px]">
                      {service.title}
                    </h3>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-soft)] text-[var(--fg)]">
                      {getServiceIcon(service.icon)}
                    </div>
                  </div>

                  <p className="mt-10 max-w-[360px] text-[13px] leading-6 text-[var(--muted)] md:mt-16 md:text-[14px]">
                    {service.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}