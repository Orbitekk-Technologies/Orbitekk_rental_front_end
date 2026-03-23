// components/shared/LottiePlayer.tsx
"use client";

import Lottie from "lottie-react";
import { cn } from "@/lib/utils/cn";

type LottiePlayerProps = {
  animationData: object;
  className?: string;
  loop?: boolean;
};

export default function LottiePlayer({
  animationData,
  className,
  loop = true,
}: LottiePlayerProps) {
  return (
    <div className={cn("w-full", className)}>
      <Lottie animationData={animationData} loop={loop} />
    </div>
  );
}