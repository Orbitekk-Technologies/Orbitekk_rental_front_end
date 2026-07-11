// components/shared/BrandLogo.tsx
import Link from "next/link";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  variant?: "full" | "badge";
  href?: string;
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  variant = "full",
  href = "/",
  className,
  priority = false,
}: BrandLogoProps) {
  const isFull = variant === "full";
  const src = isFull
    ? "/logo_full.svg?v=20260710"
    : "/logo_badge.svg?v=20260710";

  const logo = (
    <img
      src={src}
      alt={siteConfig.name}
      width={isFull ? 194 : 30}
      height={isFull ? 26 : 30}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn(
        "h-auto w-auto object-contain",
        isFull ? "h-10 md:h-11" : "h-11 w-11 md:h-12 md:w-12",
        className
      )}
    />
  );

  return (
    <Link href={href} className="inline-flex shrink-0 items-center">
      {logo}
    </Link>
  );
}
