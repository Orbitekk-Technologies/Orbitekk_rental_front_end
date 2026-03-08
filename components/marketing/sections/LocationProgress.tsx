"use client";

import Reveal from "@/components/marketing/shared/Reveal";

const items = [
  { time: "04 min", label: "Walk to nearest store" },
  { time: "05 min", label: "Walk to gas station" },
  { time: "06 min", label: "Walk to nearest drug store" },
  { time: "07 min", label: "Walk to transportation" },
];

export default function LocationProgress() {
  return (
    <section id = "location" className="pb-16 pt-6 md:pb-28 md:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <p className="text-[14px] font-medium text-[var(--muted)]">Location</p>
            <h2 className="mx-auto mt-3 max-w-[760px] text-[32px] font-semibold tracking-[-0.04em] text-[var(--fg)] md:text-[56px]">
              You've got it all steps away
            </h2>
          </div>
        </Reveal>

        {/* Desktop */}
        <Reveal className="relative mx-auto mt-16 hidden h-[320px] max-w-[1240px] md:block">
          {/* Base bar */}
          <div className="absolute left-1/2 top-[112px] h-[64px] w-[86%] -translate-x-1/2 rounded-full bg-[#e9e1f7]" />

          {/* Active segments */}
          <div className="absolute left-[9%] top-[112px] h-[64px] w-[18%] rounded-full bg-[var(--brand)]" />
          <div className="absolute left-[24%] top-[112px] h-[64px] w-[18%] rounded-full bg-[#b58cf2]" />
          <div className="absolute left-[39%] top-[112px] h-[64px] w-[18%] rounded-full bg-[#c8adf4]" />

          {/* Vertical guide lines */}
          <div className="absolute left-[13%] top-[18px] h-[64px] w-px bg-black/70" />
          <div className="absolute left-[39%] top-[176px] h-[64px] w-px bg-black/70" />
          <div className="absolute left-[63%] top-[18px] h-[64px] w-px bg-black/70" />
          <div className="absolute left-[89%] top-[176px] h-[64px] w-px bg-black/70" />

          {/* Labels */}
          <div className="absolute left-[10%] top-[96px] -translate-x-1/2 -translate-y-full">
            <h3 className="text-[54px] font-semibold leading-none tracking-[-0.05em] text-[var(--fg)]">
              {items[0].time}
            </h3>
            <p className="mt-4 text-[16px] text-[var(--fg)]/85">{items[0].label}</p>
          </div>

          <div className="absolute left-[38%] top-[188px] -translate-x-1/2">
            <h3 className="text-[54px] font-semibold leading-none tracking-[-0.05em] text-[var(--fg)]">
              {items[1].time}
            </h3>
            <p className="mt-4 text-[16px] text-[var(--fg)]/85">{items[1].label}</p>
          </div>

          <div className="absolute left-[62%] top-[96px] -translate-x-1/2 -translate-y-full">
            <h3 className="text-[54px] font-semibold leading-none tracking-[-0.05em] text-[var(--fg)]">
              {items[2].time}
            </h3>
            <p className="mt-4 text-[16px] text-[var(--fg)]/85">{items[2].label}</p>
          </div>

          <div className="absolute left-[88%] top-[188px] -translate-x-1/2">
            <h3 className="text-[54px] font-semibold leading-none tracking-[-0.05em] text-[var(--fg)]">
              {items[3].time}
            </h3>
            <p className="mt-4 text-[16px] text-[var(--fg)]/85">{items[3].label}</p>
          </div>
        </Reveal>

        {/* Mobile */}
        <Reveal className="relative mx-auto mt-12 h-[820px] w-full max-w-[340px] md:hidden">
          <div className="absolute left-1/2 top-[92px] h-[620px] w-[44px] -translate-x-1/2 rounded-full bg-[#e9e1f7]" />
          <div className="absolute left-1/2 top-[92px] h-[124px] w-[44px] -translate-x-1/2 rounded-full bg-[var(--brand)]" />
          <div className="absolute left-1/2 top-[216px] h-[124px] w-[44px] -translate-x-1/2 rounded-full bg-[#b58cf2]" />
          <div className="absolute left-1/2 top-[340px] h-[124px] w-[44px] -translate-x-1/2 rounded-full bg-[#c8adf4]" />

          {/* left 1 */}
          <div className="absolute left-[8%] top-[190px] w-[120px]">
            <h3 className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-[var(--fg)]">
              {items[0].time}
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-[var(--fg)]/85">{items[0].label}</p>
            <div className="absolute left-[84px] top-[42px] h-px w-[94px] bg-black/70" />
          </div>

          {/* right 2 */}
          <div className="absolute right-[8%] top-[382px] w-[120px] text-left">
            <h3 className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-[var(--fg)]">
              {items[1].time}
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-[var(--fg)]/85">{items[1].label}</p>
            <div className="absolute right-[84px] top-[42px] h-px w-[94px] bg-black/70" />
          </div>

          {/* left 3 */}
          <div className="absolute left-[8%] top-[574px] w-[120px]">
            <h3 className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-[var(--fg)]">
              {items[2].time}
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-[var(--fg)]/85">{items[2].label}</p>
            <div className="absolute left-[84px] top-[42px] h-px w-[94px] bg-black/70" />
          </div>

          {/* right 4 */}
          <div className="absolute right-[8%] top-[736px] w-[120px] text-left">
            <h3 className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-[var(--fg)]">
              {items[3].time}
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-[var(--fg)]/85">{items[3].label}</p>
            <div className="absolute right-[84px] top-[42px] h-px w-[94px] bg-black/70" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}