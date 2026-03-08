// components/marketing/navigation/BackToTop.tsx

"use client";

import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

export default function BackToTop() {
  function handleScrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleScrollTop}
      className="inline-flex h-[74px] w-[74px] items-center justify-center rounded-[24px] bg-[var(--brand)] text-white transition duration-300 md:hover:-translate-y-1 md:hover:bg-[var(--brand-strong)]"
    >
      <KeyboardArrowUpRoundedIcon sx={{ fontSize: 42 }} />
    </button>
  );
}