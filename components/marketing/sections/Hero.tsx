"use client";

import Image from "next/image";
import Reveal from "@/components/marketing/shared/Reveal";

export default function Hero() {
  return (
    <section className="pb-10 pt-2 md:pb-16 md:pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mx-auto max-w-[900px] text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--fg)] sm:text-[48px] md:text-[64px]">
              Crafting New Housing Vision
            </h1>

            <p className="mx-auto mt-5 max-w-[540px] text-sm leading-7 text-[var(--muted)] sm:text-[15px]">
              Managing. Leasing. Selling. Our comprehensive living space
              management app is designed to meet all your property needs.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mx-auto mt-10 max-w-[1080px]">
            <div className="relative z-10 mx-auto flex w-full max-w-[680px] items-center rounded-[22px] bg-white px-3 py-3 shadow-[var(--shadow-soft)] md:-mb-6">
              <input
                type="text"
                placeholder="Enter Your Address......"
                className="h-12 flex-1 rounded-full border-none bg-transparent px-4 text-[13px] text-[var(--fg)] outline-none placeholder:text-[var(--fg)]"
              />
              <button className="inline-flex h-12 min-w-[92px] items-center justify-center rounded-full bg-[var(--brand)] px-5 text-sm font-medium text-white transition md:hover:bg-[var(--brand-strong)]">
                Search
              </button>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-[28px] md:mt-0 md:rounded-[34px]">
              <Image
                src="/images/hero.jpg"
                alt="Modern apartment building"
                width={1600}
                height={900}
                className="h-[180px] w-full object-cover sm:h-[260px] md:h-[420px]"
                priority
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}