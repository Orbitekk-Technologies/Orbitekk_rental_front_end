// apps/web/components/marketing/Services.tsx
"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/marketing/Reveal";

type Service = {
  title: string;
  desc: string;
  icon: string;
  heightClass: string;
};

const services: Service[] = [
  {
    title: "Property Listings",
    desc: "Easily browse and manage all your property listings with our user-friendly platform.",
    icon: "home_work",
    heightClass: "md:min-h-[140px]",
  },
  {
    title: "Financial Reporting",
    desc: "Generate detailed financial statements and performance reports to stay on top of your property's financial health.",
    icon: "request_quote",
    heightClass: "md:min-h-[140px]",
  },
  {
    title: "Service Requests",
    desc: "Efficiently handle maintenance requests and work orders through our app.",
    icon: "construction",
    heightClass: "md:min-h-[120px]",
  },
  {
    title: "Tenant Management",
    desc: "Keep track of tenant information and lease agreements without hassle. Our app allows you to store and manage all necessary details.",
    icon: "group",
    heightClass: "md:min-h-[128px]",
  },
];

const grid = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const card = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function ServiceCard({ title, desc, icon, heightClass }: Service) {
  return (
    <motion.article
      variants={card}
      className={[
        "group rounded-[18px] bg-white border border-[var(--border)] p-5 shadow-sm",
        // hover ONLY desktop
        "md:hover:shadow-md md:hover:-translate-y-1 md:hover:scale-[1.01]",
        "transition-transform transition-shadow duration-200 will-change-transform",
        heightClass,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-[var(--fg)]">{title}</h3>

        <div className="h-8 w-8 rounded-full bg-[rgba(124,58,237,0.10)] grid place-items-center transition md:group-hover:scale-110">
          <span className="material-symbols-outlined text-[18px] text-[var(--brand)]">
            {icon}
          </span>
        </div>
      </div>

      <p className="mt-3 text-sm leading-5 text-[var(--muted)]">{desc}</p>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-[28px] bg-[rgba(124,58,237,0.10)] p-6 sm:p-8 md:p-10">
          <Reveal>
            <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--fg)]">
              Services We Do
            </h2>
          </Reveal>

          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-8 grid gap-5 md:grid-cols-2"
          >
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}