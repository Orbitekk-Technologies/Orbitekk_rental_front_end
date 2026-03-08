// components/marketing/sections/Footer.tsx

"use client";

import Reveal from "@/components/marketing/shared/Reveal";
import BackToTop from "@/components/marketing/navigation/BackToTop";

export default function Footer() {
  return (
    <footer id="footer" className="pb-10 pt-4 md:pb-14 md:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Top utility links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1fr_1fr_1.2fr_auto] md:items-start">
          <Reveal>
            <div>
              <h3 className="text-[16px] font-semibold text-[var(--fg)]">Address</h3>
              <p className="mt-4 max-w-[180px] text-[15px] leading-8 text-[var(--fg)]/85">
                1328 Underwood Street,
                <br />
                Apt 106,
                <br />
                Denton, TX, USA
                <br />
                76201
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div>
              <h3 className="text-[16px] font-semibold text-[var(--fg)]">Get in Touch</h3>
              <div className="mt-4 space-y-4 text-[15px] text-[var(--fg)]/90">
                <a href="#" className="block transition md:hover:text-[var(--brand)]">
                  Contact Us
                </a>
                <a href="#" className="block transition md:hover:text-[var(--brand)]">
                  Instagram
                </a>
                <a href="#" className="block transition md:hover:text-[var(--brand)]">
                  Facebook
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <h3 className="text-[16px] font-semibold text-[var(--fg)]">Menu</h3>
              <div className="mt-4 grid grid-cols-2 gap-y-4 text-[15px] text-[var(--fg)]/90">
                <a href="#services" className="transition md:hover:text-[var(--brand)]">
                  Services
                </a>
                <a href="#location" className="transition md:hover:text-[var(--brand)]">
                  How we work
                </a>
                <a href="#about" className="transition md:hover:text-[var(--brand)]">
                  About Us
                </a>
                <a href="#location" className="transition md:hover:text-[var(--brand)]">
                  Locations
                </a>
                <a href="#properties" className="transition md:hover:text-[var(--brand)]">
                  Properties
                </a>
                <a href="#faq" className="transition md:hover:text-[var(--brand)]">
                  FAQ's
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="col-span-2 mt-2 flex justify-end md:col-span-1 md:mt-0">
            <BackToTop />
          </Reveal>
        </div>

        {/* Black contact card */}
        <Reveal className="mt-12 md:mt-14">
          <div className="rounded-[34px] bg-black px-5 py-7 text-white sm:px-6 md:px-10 md:py-12 lg:px-14">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
              <div>
                <h2 className="text-[36px] font-semibold tracking-[-0.04em] text-white md:text-[44px]">
                  ProNest
                </h2>

                <p className="mt-8 text-[15px] text-white/65">Still have questions?</p>

                <p className="mt-4 max-w-[600px] text-[18px] leading-9 text-white/95 md:text-[20px]">
                  More than 1000 people rely on us. We have answers, so you're
                  not the only one with questions. See what other students wanted
                  to know by browsing our infopoint. Still in need of
                  clarification? We can be reached by message.
                </p>
              </div>

              <form className="space-y-5">
                <div>
                  <label className="mb-2 block text-[14px] text-white/85">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="h-[54px] w-full rounded-[10px] border border-white/20 bg-transparent px-4 text-[15px] text-white outline-none placeholder:text-white/40 focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[14px] text-white/85">Description</label>
                  <textarea
                    placeholder="Enter Description"
                    rows={5}
                    className="w-full rounded-[10px] border border-white/20 bg-transparent px-4 py-4 text-[15px] text-white outline-none placeholder:text-white/40 focus:border-[var(--brand)]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-[54px] w-full items-center justify-center rounded-[10px] bg-[var(--brand)] text-[16px] font-medium text-white transition duration-300 md:hover:bg-[var(--brand-strong)]"
                >
                  Send Your Quires
                </button>
              </form>
            </div>
          </div>
        </Reveal>

        {/* Bottom legal row */}
        <div className="mt-10 flex flex-col gap-4 text-[15px] text-[var(--muted)] md:mt-8 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <p>Copyright 2026 @Propowners</p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#" className="transition md:hover:text-[var(--brand)]">
                Privacy Policy
              </a>
              <a href="#" className="transition md:hover:text-[var(--brand)]">
                Term & Conditions
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}