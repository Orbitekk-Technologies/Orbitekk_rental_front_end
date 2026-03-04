// apps/web/components/marketing/BackToTop.tsx
"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const faq = document.getElementById("faq");
    if (!faq) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Show arrow when FAQ is in view (meaning user is near bottom)
        setVisible(entries[0]?.isIntersecting ?? false);
      },
      {
        root: null,
        threshold: 0.2, // appears when ~20% of FAQ is visible
      }
    );

    obs.observe(faq);
    return () => obs.disconnect();
  }, []);

  const scrollTop = () => {
    const el = document.getElementById("home");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollTop}
      aria-label="Back to top"
      className="fixed right-6 md:right-10 bottom-28 z-50 h-14 w-14 rounded-full
        bg-[var(--brand)] text-white grid place-items-center
        shadow-lg hover:scale-105 transition"
    >
      <span className="material-symbols-outlined text-[26px]">
        arrow_upward
      </span>
    </button>
  );
}