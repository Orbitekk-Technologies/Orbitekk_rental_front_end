"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = ["/corosal1.png", "/corosal2.png", "/corosal3.png"];

export default function AuthVisualCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      3000
    );
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="max-w-sm text-xl font-medium leading-relaxed text-gray-950">
        Explore our wide range of rental properties tailored to fit your lifestyle
        and needs!
      </h2>
      <div className="relative mt-14 h-44 w-72">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSlide}
            initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={slides[activeSlide]}
              alt={`Rental illustration ${activeSlide + 1}`}
              width={219}
              height={141}
              className="h-auto w-60"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex gap-1" aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}>
        {slides.map((slide, index) => (
          <button
            key={slide}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              activeSlide === index ? "w-6 bg-secondary-500" : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
