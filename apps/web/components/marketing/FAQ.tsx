// apps/web/components/marketing/FAQ.tsx
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/marketing/Reveal";

type FAQItem = {
  q: string;
  a: string;
};

export default function FAQ() {
  const faqs: FAQItem[] = useMemo(
    () => [
      {
        q: "Do I need to book in advance?",
        a: "Not necessarily. You can inquire anytime, but booking early helps you secure the best options and faster approvals.",
      },
      {
        q: "Can I move in before contract?",
        a: "In most cases, move-in requires a signed lease. Some listings may allow early move-in with written confirmation from the owner/agent.",
      },
      {
        q: "What is included in my rent?",
        a: "It depends on the property. Some rentals include utilities and maintenance, while others include only standard building services.",
      },
      {
        q: "Outstanding Property",
        a: "Explore our extensive listings of properties, ranging from cozy apartments to luxurious estates.",
      },
      {
        q: "Find Excellent Deals",
        a: "We help you discover the best rental deals with transparent pricing, verified listings, and flexible options.",
      },
      {
        q: "Can I move out hustle free ?",
        a: "Yes. We guide you with notice period reminders, documentation, and smooth handover steps so the move-out process stays simple.",
      },
    ],
    []
  );

  const [active, setActive] = useState<number>(-1); // Accordion starts clean

  return (
    <section id ="faq" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="rounded-[28px] bg-[rgba(124,58,237,0.10)] p-6 sm:p-8 md:p-10">
            <div className="text-center">
              <p className="text-xs tracking-wider text-[var(--muted)]">Info Point</p>
              <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--fg)]">
                Q&amp;A You all Need to know
              </h2>
            </div>

            {/* DESKTOP: 2 columns */}
            <div className="mt-10 hidden md:grid grid-cols-2 gap-10">
              {/* Left list */}
              <div className="space-y-3">
                {faqs.slice(0, 3).map((item, idx) => {
                  const isOpen = active === idx;
                  return (
                    <button
                      key={item.q}
                      onClick={() => setActive(idx)}
                      className={[
                        "w-full text-left flex items-center justify-between gap-4",
                        "py-4 border-b border-black/10",
                        "transition",
                        "hover:opacity-90",
                      ].join(" ")}
                    >
                      <span className="text-sm font-medium text-[var(--fg)]">{item.q}</span>

                      <span
                        className={[
                          "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)]",
                          isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
                        ].join(" ")}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isOpen ? "remove" : "add"}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right list + expanded */}
              <div className="space-y-3">
                {faqs.slice(3).map((item, i) => {
                  const idx = i + 3;
                  const isOpen = active === idx;

                  return (
                    <div key={item.q} className="border-b border-black/10 pb-4">
                      <button
                        onClick={() => setActive(idx)}
                        className="w-full text-left flex items-start justify-between gap-4 py-3"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>
                          {isOpen && (
                            <p className="mt-2 text-sm text-[var(--muted)] leading-6 max-w-md">
                              {item.a}
                            </p>
                          )}
                        </div>

                        <span
                          className={[
                            "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                            isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
                          ].join(" ")}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isOpen ? "remove" : "add"}
                          </span>
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MOBILE: accordion (ALL 6 items) */}
            <div className="mt-10 md:hidden">
              <div className="space-y-3">
                {faqs.map((item, idx) => {
                  const isOpen = active === idx;
                
                  return (
                    <div key={item.q} className="border-b border-black/10 pb-4">
                      <button
                        onClick={() => setActive(isOpen ? -1 : idx)}
                        className="w-full text-left flex items-start justify-between gap-4 py-3"
                      >
                        <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>
                  
                        <span
                          className={[
                            "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                            isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
                          ].join(" ")}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isOpen ? "remove" : "add"}
                          </span>
                        </span>
                      </button>
                        
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* MOBILE: accordion (ALL 6 items) */}
            <div className="mt-10 md:hidden">
              <div className="space-y-3">
                {faqs.map((item, idx) => {
                  const isOpen = active === idx;
                
                  return (
                    <div key={item.q} className="border-b border-black/10 pb-4">
                      <button
                        onClick={() => setActive(isOpen ? -1 : idx)}
                        className="w-full text-left flex items-start justify-between gap-4 py-3"
                      >
                        <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>
                  
                        <span
                          className={[
                            "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                            isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
                          ].join(" ")}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isOpen ? "remove" : "add"}
                          </span>
                        </span>
                      </button>
                        
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>

            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>

            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>

            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
            {/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>

          </{/* MOBILE: accordion (ALL 6 items) */}
<div className="mt-10 md:hidden">
  <div className="space-y-3">
    {faqs.map((item, idx) => {
      const isOpen = active === idx;

      return (
        <div key={item.q} className="border-b border-black/10 pb-4">
          <button
            onClick={() => setActive(isOpen ? -1 : idx)}
            className="w-full text-left flex items-start justify-between gap-4 py-3"
          >
            <div className="text-sm font-semibold text-[var(--fg)]">{item.q}</div>

            <span
              className={[
                "h-8 w-8 rounded-full grid place-items-center border border-[var(--border)] shrink-0 mt-0.5",
                isOpen ? "bg-[var(--brand)] text-white border-transparent" : "bg-white text-[var(--fg)]",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOpen ? "remove" : "add"}
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--muted)] leading-6 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
</div>
        </Reveal>
      </div>
    </section>
  );
}