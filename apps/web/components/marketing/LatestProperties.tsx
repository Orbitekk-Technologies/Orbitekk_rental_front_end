// apps/web/components/marketing/LatestProperties.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/marketing/Reveal";

type Listing = {
  id: string;
  title: string;
  distance: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  tag: string;
  image: string;
};

const listingsMock: Listing[] = Array.from({ length: 6 }).map((_, i) => ({
  id: String(i + 1),
  title: i % 2 === 0 ? "Maplewood Estates" : "Brookside Manor",
  distance: `${28 + i * 3} miles away`,
  price: i % 2 === 0 ? "$1,224" : "$2,024",
  beds: 4,
  baths: 3,
  sqft: 2080 + i * 20,
  tag: "For Rent",
  // ✅ PNG as you said
  image: `/images/properties/p${i + 1}.png`,
}));

function Dot({ active }: { active: boolean }) {
  return (
    <span
      className={[
        "inline-block h-2 w-2 rounded-full transition",
        active ? "bg-[var(--brand)]" : "bg-black/10",
      ].join(" ")}
    />
  );
}

export default function LatestProperties() {
  const listings = useMemo(() => listingsMock, []);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function getPerView() {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  }

  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const update = () => setPerView(getPerView());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pages = Math.ceil(listings.length / perView);

  function scrollToIndex(nextIndex: number) {
    const el = trackRef.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    const clamped = Math.max(0, Math.min(nextIndex, children.length - 1));

    children[clamped]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  function prev() {
    const next = Math.max(0, activeIndex - perView);
    scrollToIndex(next);
  }

  function next() {
    const nextIdx = Math.min(listings.length - 1, activeIndex + perView);
    scrollToIndex(nextIdx);
  }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;

      const containerLeft = el.getBoundingClientRect().left;
      let bestIdx = 0;
      let bestDist = Infinity;

      children.forEach((c, idx) => {
        const left = c.getBoundingClientRect().left;
        const dist = Math.abs(left - containerLeft);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActiveIndex(bestIdx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [perView]);

  const activePage = Math.floor(activeIndex / perView);

  return (
    <section id="properties" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)]">
              Latest Properties
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)] max-w-xl mx-auto">
              Our website aims to provide a seamless and user-friendly experience for individuals and families
              searching for their dream home.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 relative">
          {/* Left arrow */}
          <button
            type="button"
            aria-label="Previous"
            onClick={prev}
            className="hidden sm:grid absolute left-[-18px] top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[var(--border)] bg-white shadow-sm place-items-center hover:bg-black/5 transition z-10"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {/* Right arrow */}
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className="hidden sm:grid absolute right-[-18px] top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[var(--border)] bg-white shadow-sm place-items-center hover:bg-black/5 transition z-10"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {listings.map((p, idx) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.04 * idx }}
                className={[
                  "snap-start shrink-0 rounded-[22px] border border-[var(--border)] bg-white overflow-hidden shadow-sm",
                  // hover only desktop
                  "md:hover:shadow-md md:hover:-translate-y-1 md:hover:scale-[1.01]",
                  "transition-transform transition-shadow duration-200 will-change-transform",
                  // responsive widths (1/2/3 per view)
                  "w-[82%] sm:w-[60%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]",
                ].join(" ")}
              >
                <div className="p-4">
                  <div className="relative rounded-[16px] overflow-hidden group">
                    <div className="relative h-44">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-300 md:group-hover:scale-[1.05]"
                      />
                    </div>

                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs px-2 py-1 rounded-[10px] border border-[var(--border)]">
                      {p.tag}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold text-[var(--fg)]">{p.title}</h3>
                    <p className="text-xs text-[var(--muted)] mt-1">{p.distance}</p>

                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-[var(--brand)]">{p.price}</span>
                      <span className="text-xs text-[var(--muted)]">/month</span>
                    </div>

                    <div className="mt-3 flex gap-4 text-xs text-[var(--muted)]">
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bed</span> {p.beds}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bathtub</span> {p.baths}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">straighten</span>{" "}
                        {p.sqft.toLocaleString()} sqft
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to page ${idx + 1}`}
                onClick={() => scrollToIndex(idx * perView)}
                className="p-1"
              >
                <Dot active={idx === activePage} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}