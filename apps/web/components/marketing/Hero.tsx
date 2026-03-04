// apps/web/components/marketing/Hero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="pt-[110px] md:pt-[130px] pb-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Text */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-[28px] sm:text-[40px] md:text-[56px] font-extrabold tracking-[-0.02em] text-[var(--fg)]"
          >
            Crafting New Housing Vision
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            className="mt-3 text-sm sm:text-base text-[var(--muted)] max-w-2xl mx-auto"
          >
            Managing. Leasing. Selling. Our comprehensive living space management app is designed to meet all your
            property needs.
          </motion.p>
        </div>

        {/* Hero image + overlapping search */}
        <div className="relative mt-10">
          {/* Search bar (overlapping) */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 sm:-top-7 w-[92%] sm:w-[680px] z-10">
            <div className="bg-white rounded-[18px] border border-[var(--border)] shadow-sm px-4 py-3 flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter Your Address......"
                className="w-full outline-none bg-transparent text-sm text-[var(--fg)] placeholder:text-[var(--muted)]"
              />
              <button className="h-10 px-6 rounded-[14px] bg-[var(--brand)] text-white text-sm font-medium hover:opacity-90 transition">
                Search
              </button>
            </div>
          </div>

          {/* Image card */}
          <div className="rounded-[36px] overflow-hidden border border-[var(--border)] bg-white shadow-sm">
            <div className="relative w-full h-[190px] sm:h-[260px] md:h-[320px]">
              <Image
                src="/images/hero.jpg"
                alt="Hero"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}