"use client";

import { useEffect, useMemo, useState } from "react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Reveal from "@/components/marketing/shared/Reveal";
import PropertyCard from "@/components/marketing/shared/PropertyCard";
import { properties } from "@/data/properties";

function useVisibleCards() {
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return visibleCards;
}

export default function LatestProperties() {
  const visibleCards = useVisibleCards();
  const [index, setIndex] = useState(0);

  const totalSlides = useMemo(
    () => Math.ceil(properties.length / visibleCards),
    [visibleCards]
  );

  useEffect(() => {
    setIndex(0);
  }, [visibleCards]);

  const currentItems = useMemo(() => {
    const start = index * visibleCards;
    return properties.slice(start, start + visibleCards);
  }, [index, visibleCards]);

  function prevSlide() {
    setIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }

  function nextSlide() {
    setIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }

  return (
    <section id="properties" className="pb-16 pt-10 md:pb-28 md:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-[var(--fg)] md:text-[48px]">
              Latest Properties
            </h2>

            <p className="mx-auto mt-5 max-w-[650px] text-[16px] leading-8 text-[var(--fg)]/80">
              Our website aims to provide a seamless and user-friendly experience
              for individuals and families searching for their dream home.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12">
          <button
            aria-label="Previous properties"
            onClick={prevSlide}
            className="absolute left-[-8px] top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-[var(--fg)] transition hover:bg-white/70 md:flex lg:left-[-52px]"
          >
            <ChevronLeftRoundedIcon sx={{ fontSize: 32 }} />
          </button>

          <button
            aria-label="Next properties"
            onClick={nextSlide}
            className="absolute right-[-8px] top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-[var(--fg)] transition hover:bg-white/70 md:flex lg:right-[-52px]"
          >
            <ChevronRightRoundedIcon sx={{ fontSize: 32 }} />
          </button>

          <div
            className={`grid gap-6 ${
              visibleCards === 1
                ? "grid-cols-1"
                : visibleCards === 2
                ? "grid-cols-2"
                : "grid-cols-3"
            }`}
          >
            {currentItems.map((property, cardIndex) => (
              <Reveal key={property.id} delay={cardIndex * 0.05}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
            <button
              aria-label="Previous properties"
              onClick={prevSlide}
              className="inline-flex h-10 w-10 items-center justify-center text-[var(--fg)]"
            >
              <ChevronLeftRoundedIcon sx={{ fontSize: 32 }} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  aria-label={`Go to property slide ${dotIndex + 1}`}
                  onClick={() => setIndex(dotIndex)}
                  className={`h-3 w-3 rounded-full transition ${
                    dotIndex === index
                      ? "bg-[var(--brand)]"
                      : "bg-[#e2def3]"
                  }`}
                />
              ))}
            </div>

            <button
              aria-label="Next properties"
              onClick={nextSlide}
              className="inline-flex h-10 w-10 items-center justify-center text-[var(--fg)]"
            >
              <ChevronRightRoundedIcon sx={{ fontSize: 32 }} />
            </button>
          </div>

          <div className="mt-8 hidden items-center justify-center gap-2 md:flex">
            {Array.from({ length: totalSlides }).map((_, dotIndex) => (
              <button
                key={dotIndex}
                aria-label={`Go to property slide ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
                className={`h-3 w-3 rounded-full transition ${
                  dotIndex === index ? "bg-[var(--brand)]" : "bg-[#e2def3]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}