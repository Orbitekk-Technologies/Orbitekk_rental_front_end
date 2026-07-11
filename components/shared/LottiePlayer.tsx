// components/shared/LottiePlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { cn } from "@/lib/utils/cn";

type LottiePlayerProps = {
  animationData: object;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
};

export default function LottiePlayer({
  animationData,
  className,
  loop = true,
  autoplay = true,
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      aria-hidden="true"
    >
      {shouldRender ? (
        <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
      ) : (
        <div className="h-full min-h-[120px] w-full animate-pulse rounded-xl bg-gray-100/70" />
      )}
    </div>
  );
}