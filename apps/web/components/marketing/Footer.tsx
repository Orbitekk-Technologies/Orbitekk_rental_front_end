"use client";

import Reveal from "@/components/marketing/Reveal";

export default function Footer() {
  return (
    <footer className="pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-4">

        {/* Top Links */}
        <div className="grid md:grid-cols-3 gap-10 text-sm text-[var(--muted)]">

          <div>
            <h4 className="font-semibold text-[var(--fg)] mb-3">Address</h4>
            <p>
              1238 Underwood Street,<br/>
              Apt 106,<br/>
              Denton, TX, USA<br/>
              76201
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--fg)] mb-3">Get in Touch</h4>
            <p>Contact Us</p>
            <p>Instagram</p>
            <p>Facebook</p>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--fg)] mb-3">Menu</h4>
            <p>Services</p>
            <p>About Us</p>
            <p>Properties</p>
            <p>How we work</p>
            <p>Locations</p>
            <p>FAQ's</p>
          </div>

        </div>


        {/* Black Contact Card */}
        <Reveal>
        <div className="mt-12 rounded-[28px] bg-black text-white p-8 md:p-10 grid md:grid-cols-2 gap-10">

          <div>
            <h3 className="text-xl font-semibold">Propowners</h3>

            <p className="mt-6 text-sm text-white/80 max-w-md">
              Still have questions?
            </p>

            <p className="mt-3 text-sm text-white/70 max-w-md leading-6">
              More than 1000 people rely on us. We have answers, so you're not
              the only one with questions. See what other students wanted to
              know by browsing our infopoint. Still in need of clarification?
              We can be reached by message.
            </p>
          </div>


          <div className="space-y-4">

            <div>
              <label className="text-xs text-white/70">Email</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full mt-2 rounded-lg bg-black border border-white/20
                px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
              />
            </div>

            <div>
              <label className="text-xs text-white/70">Description</label>
              <textarea
                placeholder="Enter Description"
                rows={4}
                className="w-full mt-2 rounded-lg bg-black border border-white/20
                px-3 py-2 text-sm focus:outline-none focus:border-[var(--brand)]"
              />
            </div>

            <button
              className="w-full mt-2 rounded-lg py-3
              bg-[var(--brand)] hover:opacity-90 transition"
            >
              Send Your Queries
            </button>

          </div>

        </div>
        </Reveal>


        {/* Bottom Footer */}
        <Reveal delay={0.08}>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--muted)]">

          <div className="font-semibold text-[var(--fg)]">
            Propowners
          </div>

          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Term & Conditions</span>
          </div>

          <div>
            Copyright 2026 @Propowners
          </div>

        </div>
        </Reveal>
      </div>
    </footer>
  );
}