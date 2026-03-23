// components/shared/BrandLogo.tsx
import Image from "next/image";
import Link from "next/link";
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

  const logo = (
    <Image
      src={isFull ? "/logo_full.svg" : "/logo_badge.svg"}
      alt="ProNest"
      width={isFull ? 210 : 56}
      height={isFull ? 44 : 56}
      priority={priority}
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