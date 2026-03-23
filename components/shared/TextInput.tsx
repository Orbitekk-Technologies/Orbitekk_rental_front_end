// components/shared/TextInput.tsx
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <label className="block w-full">
        {label ? (
          <span className="mb-2 block text-sm font-medium text-[var(--fg)]">
            {label}
          </span>
        ) : null}

        <input
          ref={ref}
          className={cn(
            "h-12 w-full rounded-full border border-[var(--border)] bg-white px-4 text-sm text-[var(--fg)] outline-none transition-all",
            "placeholder:text-[var(--muted-2)]",
            "focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]",
            error && "border-red-400 focus:border-red-400 focus:ring-red-100",
            className
          )}
          {...props}
        />

        {error ? (
          <span className="mt-2 block text-xs text-red-500">{error}</span>
        ) : null}
      </label>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;