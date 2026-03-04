// apps/web/components/marketing/About.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/marketing/Reveal";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <Reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)]">
                About Our Real Estate
              </h2>

              <p className="mt-4 text-sm text-[var(--muted)] max-w-md leading-6">
                Our agency takes a collaborative approach, working closely with you
                to understand your business, how to grow up, craft personalized
                marketing solutions that align with your vision, and stay updated
                with the latest trends.
              </p>

              {/* Feature 1 */}
              <div className="mt-8 flex gap-4 items-start">
                <div className="h-12 w-12 rounded-xl bg-black/5 grid place-items-center">
                  <span className="material-symbols-outlined text-[20px] text-[var(--fg)]">
                    workspace_premium
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--fg)]">High Standert</h3>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    Lorem ipsum dolor sit amet consectetur. Malesua vehicula netu urna in elit amet.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="mt-6 flex gap-4 items-start">
                <div className="h-12 w-12 rounded-xl bg-black/5 grid place-items-center">
                  <span className="material-symbols-outlined text-[20px] text-[var(--fg)]">
                    chat_bubble
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--fg)]">Ease Of Communication</h3>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    Lorem ipsum dolor sit amet consectetur. Malesua vehicula netu urna in elit amet.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT IMAGES (Desktop Only) */}
          <Reveal delay={0.08}>
            <div className="relative hidden lg:block">
              {/* Main Image */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-[28px] overflow-hidden shadow-sm border border-[var(--border)]"
              >
                <div className="relative h-[420px] w-full">
                  <Image
                    src="/images/about/about-main.png"
                    alt="Building"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Overlay Image (float) */}
              <motion.div
                className="absolute bottom-[-30px] left-[-30px] rounded-[20px] overflow-hidden shadow-md border border-[var(--border)] bg-white"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative h-[160px] w-[220px]">
                  <Image
                    src="/images/about/about-overlay.png"
                    alt="House in hand"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}