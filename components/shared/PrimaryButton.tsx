// components/shared/PrimaryButton.tsx
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export default function PrimaryButton({
  className,
  fullWidth = false,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all",
        "bg-[var(--brand)] text-white shadow-[var(--shadow-card)]",
        "hover:bg-[var(--brand-strong)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}