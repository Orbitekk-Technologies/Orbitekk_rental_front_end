// apps/web/components/marketing/LocationSteps.tsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/marketing/Reveal";

type Step = {
  min: string;
  label: string;
};

const STEPS: Step[] = [
  { min: "04 min", label: "Walk to nearest store" },
  { min: "06 min", label: "Walk to nearest drug store" },
  { min: "05 min", label: "Walk to gas station" },
  { min: "07 min", label: "Walk to transportation" },
];

export default function LocationSteps() {
  const [active, setActive] = useState<number | null>(null);

  const segments = useMemo(
    () => [
      { bg: "bg-[rgba(124,58,237,0.95)]" },  // strong purple
      { bg: "bg-[rgba(124,58,237,0.35)]" },
      { bg: "bg-[rgba(124,58,237,0.22)]" },
      { bg: "bg-[rgba(124,58,237,0.12)]" },
    ],
    []
  );

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center">
            <p className="text-xs tracking-wider text-[var(--muted)]">Location</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-[var(--fg)]">
              You've got it all steps away
            </h2>
          </div>
        </Reveal>

        {/* DESKTOP (Horizontal) */}
        <div className="mt-12 hidden lg:block">
          <div className="relative">
            {/* Labels */}
            <div className="grid grid-cols-4 text-center text-[var(--fg)]">
              <div className="relative">
                <div className="font-semibold">{STEPS[0].min}</div>
                <div className="text-xs text-[var(--muted)] mt-1">{STEPS[0].label}</div>
                <div className="absolute right-0 top-8 h-16 w-px bg-black/10" />
              </div>

              <div className="relative">
                <div className="font-semibold">{STEPS[1].min}</div>
                <div className="text-xs text-[var(--muted)] mt-1">{STEPS[1].label}</div>
                <div className="absolute right-0 top-8 h-16 w-px bg-black/10" />
              </div>

              <div className="relative">
                <div className="font-semibold">{STEPS[2].min}</div>
                <div className="text-xs text-[var(--muted)] mt-1">{STEPS[2].label}</div>
                <div className="absolute right-0 top-8 h-16 w-px bg-black/10" />
              </div>

              <div>
                <div className="font-semibold">{STEPS[3].min}</div>
                <div className="text-xs text-[var(--muted)] mt-1">{STEPS[3].label}</div>
              </div>
            </div>

            {/* Bar */}
            <Reveal delay={0.06}>
              <div className="mt-10 mx-auto w-[78%]">
                <div className="relative h-14 rounded-[18px] bg-black/5 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    {segments.map((s, idx) => (
                      <motion.button
                        key={idx}
                        type="button"
                        onMouseEnter={() => setActive(idx)}
                        onMouseLeave={() => setActive(null)}
                        className={[
                          "flex-1 h-full",
                          s.bg,
                          "outline-none",
                        ].join(" ")}
                        // desktop-only hover lift effect
                        animate={{
                          y: active === idx ? -10 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        style={{ borderRadius: idx === 0 ? 18 : 0 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* TABLET + MOBILE (Vertical) */}
        <div className="mt-12 lg:hidden">
          <Reveal>
            <div className="relative mx-auto max-w-[420px]">
              {/* Vertical bar */}
              <div className="mx-auto w-14 h-[320px] rounded-[22px] bg-black/5 overflow-hidden">
                <div className="h-full flex flex-col">
                  {/* top = strongest */}
                  <div className="h-[25%] bg-[rgba(124,58,237,0.95)]" />
                  <div className="h-[25%] bg-[rgba(124,58,237,0.35)]" />
                  <div className="h-[25%] bg-[rgba(124,58,237,0.22)]" />
                  <div className="h-[25%] bg-[rgba(124,58,237,0.12)]" />
                </div>
              </div>

              {/* Labels alternating sides */}
              <div className="absolute inset-0">
                {/* 04 */}
                <div className="absolute top-[5%] left-0 w-[45%] text-right pr-4">
                  <div className="font-semibold">{STEPS[0].min}</div>
                  <div className="text-xs text-[var(--muted)] mt-1">{STEPS[0].label}</div>
                  <div className="mt-3 h-px bg-black/10" />
                </div>

                {/* 05 */}
                <div className="absolute top-[34%] right-0 w-[45%] pl-4">
                  <div className="font-semibold">{STEPS[2].min}</div>
                  <div className="text-xs text-[var(--muted)] mt-1">{STEPS[2].label}</div>
                  <div className="mt-3 h-px bg-black/10" />
                </div>

                {/* 06 */}
                <div className="absolute top-[55%] left-0 w-[45%] text-right pr-4">
                  <div className="font-semibold">{STEPS[1].min}</div>
                  <div className="text-xs text-[var(--muted)] mt-1">{STEPS[1].label}</div>
                  <div className="mt-3 h-px bg-black/10" />
                </div>

                {/* 07 */}
                <div className="absolute top-[82%] right-0 w-[45%] pl-4">
                  <div className="font-semibold">{STEPS[3].min}</div>
                  <div className="text-xs text-[var(--muted)] mt-1">{STEPS[3].label}</div>
                  <div className="mt-3 h-px bg-black/10" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}