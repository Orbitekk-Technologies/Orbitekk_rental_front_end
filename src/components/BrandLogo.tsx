import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BrandLogo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Shagriha home"
      className={cn("group inline-flex items-center gap-2 text-gray-950", className)}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={34}
        height={34}
        priority
        className="origin-bottom transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-2 group-hover:scale-[1.04]"
      />
      {!compact && (
        <span className="text-[1.65rem] font-semibold leading-none tracking-[-0.07em]">
          SHA<span className="font-normal text-secondary-500 transition-colors duration-200 group-hover:text-[#a855f7]">GRIHA</span>
        </span>
      )}
    </Link>
  );
}
