"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion/variants";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-12 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight"
          >
            THE PREMIER CHOICE <br />
            IN REAL ESTATE <br />
            SERVICES.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-[color:var(--muted)] leading-relaxed"
          >
            Managing leasing. Selling. Our experience and real estate management
            app is designed to meet all your property needs.
          </motion.p>

          {/* Search bar */}
          <motion.div variants={fadeUp} className="mt-7">
            <div className="flex flex-col md:flex-row gap-3 rounded-full border border-[color:var(--border)] bg-white p-2 shadow-sm">
              {/* chip */}
              <button className="px-4 py-2 rounded-full bg-[color:var(--brand)] text-white text-sm">
                Buy
              </button>

              <button className="px-4 py-2 rounded-full border border-[color:var(--border)] text-sm text-[color:var(--muted)] hover:border-black hover:text-black transition">
                Property Type
              </button>

              <input
                className="flex-1 px-4 py-2 text-sm outline-none rounded-full"
                placeholder="Search your dream destination"
              />

              <button className="px-5 py-2 rounded-full bg-[color:var(--brand)] text-white text-sm hover:opacity-95 transition">
                Search
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.05 }}
          className="relative"
        >
          <div className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--card)] p-4 shadow-sm">
            <div className="rounded-[22px] overflow-hidden bg-white border border-[color:var(--border)]">
              {/* Placeholder visual block (we’ll replace with actual image later) */}
              <div className="h-[360px] md:h-[420px] bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center text-[color:var(--muted)] text-sm">
                Hero Image / App Preview
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              whileHover={{ y: -2 }}
              className="absolute -bottom-4 left-6 rounded-2xl bg-white border border-[color:var(--border)] px-4 py-3 shadow-sm"
            >
              <div className="text-sm font-semibold">1.5k+</div>
              <div className="text-xs text-[color:var(--muted)]">
                Happy clients and transactions
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}